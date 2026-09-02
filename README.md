# Lemon Tracking

Complete and objective screen-time measurement for Windows, macOS, Linux and Android.

Lemon Tracking records foreground application activity and local screen-use records. It is designed to keep the collected records on the user's device, with local views for today, timelines, applications and history, plus JSON and CSV export.

## Website and downloads

- Website: <https://lemontracking.org/>
- Download page: <https://lemontracking.org/download/>
- Documentation: <https://lemontracking.org/docs/>
- Screenshots: <https://lemontracking.org/screenshots/>
- FAQ: <https://lemontracking.org/faq/>
- Changelog: <https://lemontracking.org/changelog/>

The current public package release is **0.1.2**.

| Platform | Package | Included capability |
| --- | --- | --- |
| Windows x64 | `assets/downloads/LemonTracking-Windows-x64-Portable.zip` | Portable desktop collector, tray controls and local console |
| macOS Apple Silicon | `assets/downloads/LemonTracking-macOS-arm64.tar.gz` | Local agent with System Events and IOHIDSystem adapters |
| Linux x86_64 | `assets/downloads/LemonTracking-Linux-x86_64.tar.gz` | Local agent with X11 process lookup and idle integration |
| Android | `assets/downloads/LemonTracking-Android.apk` | Current-day foreground application summary through Usage Access |

## Checksums

Verify a downloaded package with SHA-256 before opening it.

| File | Size (bytes) | SHA-256 |
| --- | ---: | --- |
| `LemonTracking-Windows-x64-Portable.zip` | 98,769 | `296C52682952F5D1EEC86D98A9092B5165F0E6950F72C4CCA9DCFD2D305CD5EF` |
| `LemonTracking-macOS-arm64.tar.gz` | 43,753 | `4EB0F5AB847584E9B017F772FA0E5FF551327DEA8F85DD983AB43292070752B4` |
| `LemonTracking-Linux-x86_64.tar.gz` | 46,143 | `E74B0C45536811D9785759DB1EC1EED4C1E9ABC050851C25EE171A8BE42934D4` |
| `LemonTracking-Android.apk` | 16,791 | `2E6060F4CF1E69A25E74A8FFCDD33474FCDCBBF79AC8611D10FE923F5D998B26` |

## Platform notes

- Windows uses the portable package and provides tray pause/resume controls.
- macOS and Linux packages are terminal-controlled local agents.
- Android requires the user to enable Usage Access for Lemon Tracking in Android Settings. The Android collector produces local JSON output.
- Manual past activity and daily estimates are supported alongside automatically collected records.
- Data export and deletion are local operations.

## Build the website

This repository contains the public Lemon Tracking website and its downloadable packages.

```text
corepack pnpm install
corepack pnpm build
```

The project uses Node.js 22 or newer. The generated site is configured for the project's Cloudflare/Sites deployment.

## Repository layout

- `app/` — website routes, metadata and the AI-readable endpoint
- `components/` and `lib/` — shared UI and product description
- `assets/downloads/` — published platform packages
- `android/` — Android collector source and build files
- `public/` — robots, sitemap-facing headers and `llms.txt`

## Upstream references

The changelog contains an attributed link to the ActivityWatch v0.14.0b3 release notes for release-history context. Lemon Tracking does not bundle or synchronize ActivityWatch code.

## Status

Lemon Tracking is an early public release. See the [online changelog](https://lemontracking.org/changelog/) for the current release history and the [FAQ](https://lemontracking.org/faq/) for product questions.
