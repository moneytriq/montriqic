// DownloadSection.jsx
import React from "react";
import styles from "./download-section.module.css";
import { downloadSectionData } from "@/lib/data/downloadSectionData";

const iconPaths = {
  appstore: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="mr-2 -mt-1 inline-block h-5 w-5 fill-jacarta-500"
    >
      <g>
        <path fill="none" d="M0 0h24v24H0z"></path>
        <path
          fillRule="nonzero"
          d="M11.624 7.222c-.876 0-2.232-.996-3.66-.96-1.884.024-3.612 1.092-4.584 2.784-1.956 3.396-.504 8.412 1.404 11.172.936 1.344 2.04 2.856 3.504 2.808 1.404-.06 1.932-.912 3.636-.912 1.692 0 2.172.912 3.66.876 1.512-.024 2.472-1.368 3.396-2.724 1.068-1.56 1.512-3.072 1.536-3.156-.036-.012-2.94-1.128-2.976-4.488-.024-2.808 2.292-4.152 2.4-4.212-1.32-1.932-3.348-2.148-4.056-2.196-1.848-.144-3.396 1.008-4.26 1.008zm3.12-2.832c.78-.936 1.296-2.244 1.152-3.54-1.116.048-2.46.744-3.264 1.68-.72.828-1.344 2.16-1.176 3.432 1.236.096 2.508-.636 3.288-1.572z"
        ></path>
      </g>
    </svg>
  ),
  googleplay: (
    <svg
      width="17"
      height="18"
      viewBox="0 0 17 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_googleplay)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.815635 0.506775C0.615202 0.718493 0.5 1.04436 0.5 1.46779V16.5292C0.5 16.9527 0.615202 17.2785 0.823128 17.4829L0.877451 17.528L9.46423 9.08873V8.8991L0.869958 0.46167L0.815635 0.506775Z"
          fill="url(#paint0_googleplay)"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.3212 11.9129L9.45703 9.09707V8.90008L12.3221 6.08423L12.3839 6.12197L15.7725 8.01455C16.7429 8.55213 16.7429 9.43766 15.7725 9.98261L12.3839 11.8752C12.383 11.8752 12.3212 11.9129 12.3212 11.9129Z"
          fill="url(#paint1_googleplay)"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.3835 11.8751L9.45751 8.99854L0.816406 17.4912C1.13204 17.8244 1.6631 17.8622 2.2569 17.5363L12.3835 11.8751Z"
          fill="url(#paint2_googleplay)"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.3835 6.12303L2.2569 0.469231C1.66403 0.136005 1.13204 0.18111 0.816406 0.514336L9.45657 8.99872L12.3835 6.12303Z"
          fill="url(#paint3_googleplay)"
        />
        <path
          opacity="0.2"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.322 11.8145L2.26472 17.4305C1.70275 17.7481 1.20167 17.726 0.878542 17.4379L0.824219 17.4913L0.878542 17.5364C1.20167 17.8236 1.70275 17.8466 2.26472 17.529L12.3913 11.8752L12.322 11.8145Z"
          fill="black"
        />
        <path
          opacity="0.12"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.7704 9.88407L12.3125 11.8144L12.3743 11.8751L15.7629 9.98256C16.2481 9.71009 16.4869 9.35477 16.4869 8.99854C16.456 9.3244 16.2097 9.63461 15.7704 9.88407Z"
          fill="black"
        />
        <path
          opacity="0.25"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.25613 0.567505L15.7713 8.11388C16.2106 8.35598 16.4569 8.67355 16.4953 8.99942C16.4953 8.6441 16.2565 8.28786 15.7713 8.01539L2.25613 0.46901C1.28581 -0.0759346 0.5 0.377879 0.5 1.46777V1.56626C0.5 0.476374 1.28581 0.0299246 2.25613 0.567505Z"
          fill="white"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_googleplay"
          x1="8.69318"
          y1="1.3059"
          x2="-5.02929"
          y2="5.02617"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00A0FF" />
          <stop offset="0.007" stopColor="#00A1FF" />
          <stop offset="0.26" stopColor="#00BEFF" />
          <stop offset="0.512" stopColor="#00D2FF" />
          <stop offset="0.76" stopColor="#00DFFF" />
          <stop offset="1" stopColor="#00E3FF" />
        </linearGradient>
        <linearGradient
          id="paint1_googleplay"
          x1="17.0352"
          y1="8.99899"
          x2="0.264462"
          y2="8.99899"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFE000" />
          <stop offset="0.409" stopColor="#FFBD00" />
          <stop offset="0.775" stopColor="#FFA500" />
          <stop offset="1" stopColor="#FF9C00" />
        </linearGradient>
        <linearGradient
          id="paint2_googleplay"
          x1="10.7924"
          y1="10.5634"
          x2="0.0306903"
          y2="28.9927"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF3A44" />
          <stop offset="1" stopColor="#C31162" />
        </linearGradient>
        <linearGradient
          id="paint3_googleplay"
          x1="-1.35877"
          y1="-4.5032"
          x2="3.44229"
          y2="3.72749"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#32A071" />
          <stop offset="0.069" stopColor="#2DA771" />
          <stop offset="0.476" stopColor="#15CF74" />
          <stop offset="0.801" stopColor="#06E775" />
          <stop offset="1" stopColor="#00F076" />
        </linearGradient>
        <clipPath id="clip0_googleplay">
          <rect
            width="16"
            height="17.5238"
            fill="white"
            transform="translate(0.5 0.238037)"
          />
        </clipPath>
      </defs>
    </svg>
  ),
};

export default function DownloadGrid() {
  const { title, subtitle, buttons, mobileImage, qrImage, highlights } =
    downloadSectionData;

  return (
    <>
      <div className={styles.wrapper}>
        {/* Left */}
        <div className={styles.left}>
          <h2 className={styles.title}>
            {title} <span className={styles.subtitle}>{subtitle}</span>
          </h2>
          <div className={styles.buttons}>
            {buttons.map((btn, idx) => (
              <a key={idx} href={btn.href} className={styles.button}>
                {iconPaths[btn.iconType]}
                {btn.text}
              </a>
            ))}
          </div>
        </div>

        {/* Center Mobile Image */}
        <div className={styles.centerImage}>
          <img src={mobileImage} alt="Mobile App" className="inline-block" />
        </div>

        {/* Right QR / Highlight */}
        <div className={styles.right}>
          <div className={styles.qrContainer}>
            <img src={qrImage} alt="QR code" />
          </div>
          <div className={styles.highlight}>
            {highlights.map((h, idx) => (
              <div key={idx} className="flex items-center gap-2 mt-2">
                {h.iconRotate && (
                  <svg
                    className={styles.highlightSvg}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g>
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z"></path>
                    </g>
                  </svg>
                )}
                <span>{h.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
