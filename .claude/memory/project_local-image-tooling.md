---
name: project-local-image-tooling
description: "이 macOS 환경에 ImageMagick/pngquant/optipng 없음, Pillow는 리사이즈·ico용, AVIF 변환은 ffmpeg(libsvtav1)로 설치 없이 가능"
metadata: 
  node_type: memory
  type: project
  originSessionId: 25c58507-9a18-467e-9049-8055e25566e3
  modified: 2026-10-04T00:04:47.696Z
---

2026-10-04 appIcon.png → favicon/icon 세트 생성 작업 중 확인: 이 머신에는 `magick`/`convert`(ImageMagick), `pngquant`, `optipng`가 설치되어 있지 않다. 반면 `python3 -c "from PIL import Image"`는 성공 — Pillow는 사용 가능하다. `sips`도 `.ico` writable로 지원하지만 멀티사이즈 ico 생성이나 세밀한 압축 제어는 Pillow가 더 간단하다(`Image.save(path, sizes=[(16,16),(32,32),(48,48)])`로 멀티사이즈 ico 한 번에 생성 가능).

**Why:** ImageMagick이 당연히 있을 거라 가정하고 `convert`/`magick` 명령을 시도하면 바로 실패한다. 반대로 Pillow(`optimize=True, compress_level=9`)는 무손실 재압축만 가능하고, 그라디언트/알파가 많은 PNG(예: icon-512x512.png, 472x472 원본에서 업스케일)는 손실 압축 도구(pngquant 등) 없이는 용량이 거의 줄지 않는다 — 508KB → 520KB로 오히려 늘어난 사례 있음.

**How to apply:** 이미지 리사이즈/포맷 변환/아이콘 생성 작업 시 바로 Pillow(python3)를 1순위로 쓴다. PNG 용량을 크게 줄여야 하는 요청이 오면(AVIF 변환 제외, 아래 갱신 참고) `brew install pngquant` 설치가 필요하다는 점을 먼저 사용자에게 안내하고 승인받을 것(임의 설치 금지).

**⚠️ 갱신 (2026-10-23):** 위 목록에 빠진 도구가 있다 — `/opt/homebrew/bin/ffmpeg`에 `libsvtav1`이 들어 있어 **PNG→AVIF 변환이 설치 없이 가능**하다(`sharp`/`avifenc`/ImageMagick은 여전히 없음). 홀리윈 목업 PNG 9장(약 18MB)을 750KB로 줄인 실제 사례:
`ffmpeg -i in.png -c:v libsvtav1 -crf 24 -preset 4 -pix_fmt yuv420p -frames:v 1 -f avif out.avif` (`-f avif` 필수, 홀수 높이는 인코더가 +1~2px 늘림). 결과 검증은 `ffmpeg -i out.avif check.png`로 디코드해서 눈으로 확인. 위 "손실 압축은 pngquant 설치 승인부터"라는 안내는 **AVIF 변환에는 적용되지 않는다** — 이 프로젝트의 이미지는 avif가 기본 포맷이다([[project-holywin-2026-card]], [[project-gopoomgyeok-card]]).
