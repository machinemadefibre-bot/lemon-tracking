package org.lemontracking.android;

import android.app.Activity;
import android.app.AppOpsManager;
import android.app.usage.UsageStats;
import android.app.usage.UsageStatsManager;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.os.Bundle;
import android.os.Process;
import android.provider.Settings;
import android.view.Gravity;
import android.view.View;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.TextView;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.FileOutputStream;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

public final class MainActivity extends Activity {
    private static final int TEXT_PRIMARY = Color.rgb(32, 32, 32);
    private static final int TEXT_MUTED = Color.rgb(92, 92, 92);
    private static final int BLUE = Color.rgb(0, 82, 204);

    private UsageStatsManager usageStatsManager;
    private PackageManager packageManager;
    private TextView accessStatus;
    private TextView summaryStatus;
    private LinearLayout recordsPanel;

    @Override
    protected void onCreate(Bundle state) {
        super.onCreate(state);
        usageStatsManager = (UsageStatsManager) getSystemService(USAGE_STATS_SERVICE);
        packageManager = getPackageManager();
        setContentView(buildView());
        refresh();
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (accessStatus != null) {
            refresh();
        }
    }

    private View buildView() {
        ScrollView scroll = new ScrollView(this);
        LinearLayout root = new LinearLayout(this);
        root.setOrientation(LinearLayout.VERTICAL);
        root.setPadding(dp(18), dp(18), dp(18), dp(18));
        root.setBackgroundColor(Color.WHITE);
        scroll.addView(root);

        TextView title = text("LEMON TRACKING", 22, TEXT_PRIMARY);
        title.setTypeface(null, android.graphics.Typeface.BOLD);
        root.addView(title, fullWidth());

        TextView subtitle = text("Android local activity summary", 14, TEXT_MUTED);
        root.addView(subtitle, marginTop(4));

        TextView description = text(
                "Usage Access reads foreground application time from Android. "
                        + "Records stay in this device's local application storage.",
                15, TEXT_PRIMARY);
        root.addView(description, marginTop(20));

        TextView setupHint = text(
                android.os.Build.VERSION.SDK_INT >= 35
                        ? "Android 15 and newer may require App info > Allow restricted settings before Usage Access."
                        : "If Android shows a restricted-setting message, use App info > Allow restricted settings first.",
                13, TEXT_MUTED);
        root.addView(setupHint, marginTop(10));

        accessStatus = text("Usage Access: checking", 15, TEXT_PRIMARY);
        root.addView(accessStatus, marginTop(18));

        Button openAppInfo = button("Open app info");
        openAppInfo.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
                intent.setData(android.net.Uri.parse("package:" + getPackageName()));
                startActivity(intent);
            }
        });
        root.addView(openAppInfo, marginTop(8));

        Button openSettings = button("Open Usage Access");
        openSettings.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(Settings.ACTION_USAGE_ACCESS_SETTINGS);
                startActivity(intent);
            }
        });
        root.addView(openSettings, marginTop(8));

        Button refreshButton = button("Refresh today");
        refreshButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                refresh();
            }
        });
        root.addView(refreshButton, marginTop(8));

        summaryStatus = text("", 14, TEXT_MUTED);
        root.addView(summaryStatus, marginTop(18));

        recordsPanel = new LinearLayout(this);
        recordsPanel.setOrientation(LinearLayout.VERTICAL);
        root.addView(recordsPanel, marginTop(8));

        TextView storage = text("Local JSON: " + getFilesDir().getAbsolutePath() + "/records.json", 12, TEXT_MUTED);
        root.addView(storage, marginTop(24));

        return scroll;
    }

    private void refresh() {
        boolean allowed = hasUsageAccess();
        accessStatus.setText(allowed
                ? "Usage Access: enabled"
                : "Usage Access: permission required in Android Settings");
        accessStatus.setTextColor(allowed ? Color.rgb(24, 110, 48) : Color.rgb(160, 76, 0));
        if (!allowed) {
            summaryStatus.setText("Enable Usage Access, then select Refresh today.");
            recordsPanel.removeAllViews();
            return;
        }

        long start = startOfToday();
        long end = System.currentTimeMillis();
        List<Record> records = readToday(start, end);
        saveLocalJson(records, start, end);
        recordsPanel.removeAllViews();
        if (records.isEmpty()) {
            summaryStatus.setText("No foreground application time returned for today.");
            return;
        }

        long total = 0;
        for (Record record : records) {
            total += record.durationMs;
            TextView row = text(record.label + "\n" + formatDuration(record.durationMs)
                    + "  ·  " + record.packageName, 15, TEXT_PRIMARY);
            row.setPadding(dp(10), dp(10), dp(10), dp(10));
            row.setBackgroundColor(Color.rgb(246, 246, 246));
            recordsPanel.addView(row, marginBottom(6));
        }
        summaryStatus.setText(records.size() + " applications · " + formatDuration(total)
                + " foreground time · saved locally");
    }

    private List<Record> readToday(long start, long end) {
        Map<String, Long> durations = new HashMap<>();
        List<UsageStats> stats = usageStatsManager.queryUsageStats(
                UsageStatsManager.INTERVAL_DAILY, start, end);
        if (stats != null) {
            for (UsageStats stat : stats) {
                if (stat.getTotalTimeInForeground() <= 0 || getPackageName().equals(stat.getPackageName())) {
                    continue;
                }
                Long previous = durations.get(stat.getPackageName());
                durations.put(stat.getPackageName(), (previous == null ? 0 : previous)
                        + stat.getTotalTimeInForeground());
            }
        }

        List<Record> records = new ArrayList<>();
        for (Map.Entry<String, Long> entry : durations.entrySet()) {
            records.add(new Record(entry.getKey(), applicationLabel(entry.getKey()), entry.getValue()));
        }
        Collections.sort(records, new Comparator<Record>() {
            @Override
            public int compare(Record left, Record right) {
                return Long.compare(right.durationMs, left.durationMs);
            }
        });
        return records;
    }

    private void saveLocalJson(List<Record> records, long start, long end) {
        try {
            JSONObject root = new JSONObject();
            root.put("platform", "Android");
            root.put("date", new SimpleDateFormat("yyyy-MM-dd", Locale.US).format(new Date(start)));
            root.put("source", "automatic");
            root.put("updatedAt", new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssXXX", Locale.US).format(new Date(end)));
            JSONArray items = new JSONArray();
            for (Record record : records) {
                JSONObject item = new JSONObject();
                item.put("application", record.label);
                item.put("package", record.packageName);
                item.put("durationSeconds", record.durationMs / 1000);
                item.put("afk", false);
                item.put("source", "automatic");
                items.put(item);
            }
            root.put("records", items);
            FileOutputStream output = openFileOutput("records.json", MODE_PRIVATE);
            output.write(root.toString(2).getBytes(StandardCharsets.UTF_8));
            output.close();
        } catch (Exception ignored) {
            summaryStatus.setText("Usage data loaded; local JSON save needs another refresh.");
        }
    }

    private boolean hasUsageAccess() {
        AppOpsManager appOps = (AppOpsManager) getSystemService(Context.APP_OPS_SERVICE);
        int mode;
        if (android.os.Build.VERSION.SDK_INT >= 30) {
            mode = appOps.unsafeCheckOpNoThrow(AppOpsManager.OPSTR_GET_USAGE_STATS,
                    Process.myUid(), getPackageName());
        } else {
            mode = appOps.checkOpNoThrow(AppOpsManager.OPSTR_GET_USAGE_STATS,
                    Process.myUid(), getPackageName());
        }
        return mode == AppOpsManager.MODE_ALLOWED;
    }

    private String applicationLabel(String packageName) {
        try {
            ApplicationInfo info = packageManager.getApplicationInfo(packageName, 0);
            return packageManager.getApplicationLabel(info).toString();
        } catch (PackageManager.NameNotFoundException ignored) {
            return packageName;
        }
    }

    private long startOfToday() {
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        return calendar.getTimeInMillis();
    }

    private String formatDuration(long durationMs) {
        long minutes = Math.max(0, durationMs / 60000);
        if (minutes < 60) {
            return minutes + " min";
        }
        return (minutes / 60) + " h " + (minutes % 60) + " min";
    }

    private TextView text(String value, int size, int color) {
        TextView view = new TextView(this);
        view.setText(value);
        view.setTextSize(size);
        view.setTextColor(color);
        return view;
    }

    private Button button(String label) {
        Button view = new Button(this);
        view.setText(label);
        view.setTextColor(BLUE);
        view.setGravity(Gravity.START | Gravity.CENTER_VERTICAL);
        return view;
    }

    private LinearLayout.LayoutParams fullWidth() {
        return new LinearLayout.LayoutParams(-1, -2);
    }

    private LinearLayout.LayoutParams marginTop(int value) {
        LinearLayout.LayoutParams params = fullWidth();
        params.topMargin = dp(value);
        return params;
    }

    private LinearLayout.LayoutParams marginBottom(int value) {
        LinearLayout.LayoutParams params = fullWidth();
        params.bottomMargin = dp(value);
        return params;
    }

    private int dp(int value) {
        return Math.round(value * getResources().getDisplayMetrics().density);
    }

    private static final class Record {
        final String packageName;
        final String label;
        final long durationMs;

        Record(String packageName, String label, long durationMs) {
            this.packageName = packageName;
            this.label = label;
            this.durationMs = durationMs;
        }
    }
}
