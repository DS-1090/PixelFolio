import { Html } from "@react-three/drei";
import { ASSET_URLS } from "../config/assets";

export default function MonitorContent({ position, rotation, scale = 1 }) {
  const resumeUrl = ASSET_URLS.resumePdfUrl;

  return (
    <Html
      transform
      position={position}
      rotation={rotation}
      scale={scale}
      distanceFactor={1.1}
      zIndexRange={[5, 0]}
      wrapperClass="monitor-wrapper"
    >
      <article className="monitor-content">
        <div className="monitor-screen">
          <header className="monitor-titlebar">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
            <strong>Resume.txt</strong>
          </header>

          <section className="monitor-body monitor-body--resume">
            <div className="monitor-resume-frame">
              <object data={resumeUrl} type="application/pdf" className="monitor-resume-object">
                <div className="resume-fallback">
                  <p>Inline PDF preview is unavailable in this browser.</p>
                  <a href={resumeUrl} target="_blank" rel="noreferrer">
                    Open Resume
                  </a>
                </div>
              </object>
            </div>
          </section>

          <div className="crt-layer crt-scanlines" />
          <div className="crt-layer crt-vignette" />
          <div className="crt-layer crt-noise" />
          <div className="crt-layer crt-flicker" />
        </div>
      </article>
    </Html>
  );
}
