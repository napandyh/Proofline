# What goes in this folder

The site looks finished without any of these. Add them when you have them.

| File | Size | What it is | What happens if it's missing |
|---|---|---|---|
| `og-image.png` | 1200 × 630 px, under ~200 KB | The picture shown when the link is shared on LinkedIn, iMessage, Slack or X. Suggested content: graphite background (#0f1419), the word PROOFLINE and the tagline in off-white, one amber (#ffb84d) accent, e.g. a screenshot of the hero monitor. | Link previews show text only. |
| `demo.mp4` | 1080p or 720p, H.264, ideally under 20 MB | Your screen recording of the simulation demo. Keep it under ~90 seconds. It plays muted, so add on-screen text labels (including "fault injected"). | The "Demo video coming soon" box is shown. |
| `demo-poster.png` | Same aspect ratio as the video (16:9), e.g. 1280 × 720 | The still frame shown before the video plays. A good choice: the moment the alarm fires. | The player shows the video's first frame instead. |
| `demo-captions.vtt` (optional) | — | Captions, only needed if the video has narration. Then uncomment the `<track>` line in `index.html`. | — |

File names are case-sensitive on GitHub Pages: `demo.mp4` works, `Demo.MP4` won't.
