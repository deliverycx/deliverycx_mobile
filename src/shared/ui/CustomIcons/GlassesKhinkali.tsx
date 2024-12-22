import * as React from 'react';
import {FC} from 'react';
import Svg, {G, Mask, Path} from 'react-native-svg';

export const GlassesKhinkal: FC = props => {
  return (
    <Svg width={140} height={140} viewBox="0 0 512 512" fill="none" {...props}>
      <Path
        d="M273.58 129.92c.36 0 .73 0 1.1.01 5.66.04 10.44 4.48 10.87 10.11 3.26 43.37 47.35 63.07 47.8 63.26 10.73 4.94 20.69 10.43 29.77 16.37h.07c2.57 0 3.31 7.87 6.77 7.91.46.01.85.01 1.21.01 1.32 0 2-.03 2.72-.03 1.04 0 2.16.07 5.43.42 4.5.48 4.38 1.39 7 1.39.35 0 .76-.02 1.23-.05 17.36 3.06 28.7 6.54 28.9 6.6.79.24 1.32.97 1.33 1.79l.11 15.72a1.89 1.89 0 01-1.89 1.9h-.11l-4.29-.25c-.29 3.75-.78 7.82-1.42 12.01 6.73 11.97 10.53 24.53 11.37 37.57.26.24.47.54.59.9.59 1.71 14.38 42.02 1.53 56.17-1.87 2.06-4.08 3.09-6.49 3.09-1.97 0-4.08-.69-6.26-2.08-.66-.42-4.81-3.62-6.66-6.49-19.85 23.6-53.14 39.56-80.94 47.17-2.47 6.85-15.65 41.32-30.55 41.53h-.16c-2.99 0-5.52-1.19-7.33-3.46-5.56-6.98-3.18-23.04-1.76-30.16-13.22 2.05-25.78 2.72-36.35 2.72-12.3 0-21.92-.88-26.81-1.44 1.7 6.12 4.77 19.98.44 27.79-1.6 2.88-4 4.73-7.15 5.48-.64.15-1.29.23-1.94.23-14.38 0-29.32-36.45-31.04-40.78 0-.01 0-.02-.01-.03-16.05-4.06-39.14-10.68-58.14-23.62-6.13-4.17-11.38-8.72-15.78-13.63-2.05 2.43-5.06 4.74-5.62 5.1-2.17 1.39-4.28 2.08-6.26 2.08-2.41 0-4.63-1.03-6.49-3.09-12.86-14.16.93-54.46 1.53-56.17.13-.38.36-.7.64-.95.26-2.3.6-4.64 1.04-7.02 1.9-10.09 4.88-18.72 8.63-26.25-1.7-7.35-2.99-14.65-3.68-21.07l-4.27.41c-.06.01-.12.01-.18.01-.46 0-.91-.17-1.26-.48-.39-.35-.62-.85-.63-1.37l-.36-15.72c-.02-.82.49-1.55 1.26-1.83.48-.17 29.25-10.11 65.98-13.24 1.14.29 2.06.39 2.76.39.8 0 1.33-.12 1.6-.21-.14.15-.21.23-.18.23.02 0 .16-.1.42-.32 0 0-.08.04-.23.09 1.04-1.09 6.17-5.85 8.83-7.76 2.91-2.15 5.7-4.38 8.31-6.78 16.42-15.09 14.36-44.84 12.72-56.94-.74-5.79 12.23-11.28 21.85-12.67 1.26-.18 2.38-.25 3.41-.25 1.91 0 3.49.24 4.95.46 1.23.19 2.41.37 3.74.37 3.3 0 7.53-1.11 15.74-5.98 12.67-7.53 22.29-9.17 32.59-9.17zm0-10c-10.34 0-22.06 1.28-37.72 10.58-5.05 2.99-8.73 4.58-10.64 4.58-.57 0-1.3-.11-2.22-.25-1.63-.25-3.81-.58-6.47-.58-1.61 0-3.19.12-4.84.36-6.1.88-12.83 3.02-18.01 5.71-11.96 6.23-12.86 14.03-12.33 18.13v.04l.01.04c1.12 8.22 3.74 35.99-9.57 48.23-2.12 1.95-4.55 3.93-7.44 6.06-1.93 1.39-4.52 3.64-6.63 5.57l-1.51.13c-38.29 3.26-68.15 13.66-68.45 13.77a11.882 11.882 0 00-7.94 11.49l.36 15.72c.07 3.29 1.53 6.43 3.99 8.62 1.07.95 2.28 1.68 3.58 2.19.54 3.32 1.19 6.77 1.95 10.29-3.56 7.85-6.23 16.44-7.95 25.58-.34 1.78-.63 3.61-.88 5.47-.16.35-.31.71-.43 1.08-.42 1.21-4.19 12.27-6.23 25.12-3.01 18.98-.74 32.79 6.75 41.05 3.73 4.11 8.66 6.37 13.9 6.37 3.86 0 7.71-1.19 11.44-3.53 3.25 2.9 6.78 5.65 10.58 8.24 18.01 12.27 39.09 19.18 56.46 23.8 2.05 4.71 5.37 11.78 9.5 18.72 9.47 15.91 18.91 23.65 28.86 23.65 1.44 0 2.88-.17 4.27-.5 5.9-1.41 10.59-4.99 13.57-10.35 3.43-6.19 3.93-14.03 3.14-21.59 4.23.23 9.12.39 14.49.39 8.38 0 16.64-.4 24.71-1.18-.68 11 1.19 19.33 5.58 24.85 3.71 4.66 9.09 7.23 15.15 7.23H292.9c10.22-.14 19.53-7.76 28.47-23.28 4.16-7.24 7.45-14.81 9.52-20.01 14.16-4.26 28.14-10.11 40.72-17.06 12.96-7.16 24.03-15.22 33.02-24.05.4.29.71.51.91.63 3.79 2.42 7.71 3.65 11.64 3.65 5.23 0 10.17-2.26 13.9-6.37 7.49-8.25 9.77-22.06 6.75-41.05-2.04-12.84-5.81-23.91-6.24-25.13-.07-.21-.15-.42-.24-.63-1.12-12.55-4.74-24.77-10.79-36.4l.12-.87a12 12 0 003.53-2.32 11.93 11.93 0 003.7-8.7l-.11-15.72c-.04-5.2-3.4-9.73-8.36-11.27-.11-.03-11.92-3.69-30.14-6.9l-1.24-.22-1.26.1c-.05 0-.09.01-.13.01-1.43-.47-3.22-.99-6.26-1.32-3.03-.32-4.56-.45-5.96-.47-1.23-2.4-3.41-5.82-7.34-7.24-9.15-5.87-19.08-11.29-29.55-16.1l-.09-.04-.05-.02c-.39-.18-10.44-4.81-20.57-14.07-12.99-11.87-20.16-25.6-21.3-40.8-.82-10.79-9.94-19.29-20.77-19.36-.4-.06-.8-.07-1.2-.07z"
        fill="#fff"
      />
      <Path
        d="M388.77 168.65h.11c.95.06 1.69.85 1.68 1.8 0 .68.06 16.84 14.27 21.18a1.782 1.782 0 01-.11 3.44c-.44.11-11.13 3.01-13.25 21.91-.1.9-.85 1.58-1.76 1.58h-.02c-.9 0-1.65-.67-1.77-1.55-.02-.17-2.33-16.81-15.07-20.61-.71-.21-1.24-.86-1.29-1.61-.08-1.27.98-1.75 1.49-1.97 7.9-3.53 12.72-11.34 13.94-22.59.11-.9.89-1.58 1.78-1.58zm0-10a11.76 11.76 0 00-11.71 10.51c-.83 7.61-3.55 12.51-8.08 14.53-5.84 2.61-7.65 7.79-7.39 11.75.14 2.17.89 4.21 2.08 5.94l.59 2.89 5.74 1.71c5.25 1.56 7.6 9.65 8.02 12.4.79 5.8 5.8 10.18 11.67 10.18h1.15l.51-.12c5.25-.74 9.45-4.96 10.06-10.35 1.2-10.71 5.49-13.13 6.14-13.43 4.89-1.4 8.37-5.83 8.54-10.95.17-5.3-3.26-10.09-8.33-11.65-6.9-2.11-7.19-10.57-7.2-11.59.03-6.26-4.83-11.44-11.08-11.81-.23 0-.47-.01-.71-.01zM129.761 149.17h.12c.95.06 1.69.85 1.68 1.8 0 .68.06 16.85 14.27 21.18.77.24 1.29.96 1.26 1.76-.03.8-.59 1.49-1.37 1.68-.44.11-11.13 3.01-13.25 21.91-.1.9-.85 1.58-1.76 1.58h-.02c-.9 0-1.65-.67-1.77-1.55-.02-.17-2.33-16.81-15.06-20.61a1.81 1.81 0 01-1.29-1.61c-.08-1.27.98-1.75 1.49-1.97 7.9-3.53 12.72-11.34 13.94-22.59.11-.9.87-1.58 1.76-1.58zm0-10c-6.02 0-11.05 4.52-11.7 10.52-.83 7.62-3.55 12.51-8.08 14.53-5.85 2.6-7.65 7.79-7.39 11.76.32 4.9 3.71 9.13 8.42 10.53 5.24 1.56 7.59 9.65 8.01 12.4.79 5.81 5.8 10.18 11.67 10.18h1.08l.48-.1c5.29-.7 9.54-4.94 10.15-10.37 1.2-10.71 5.49-13.12 6.15-13.43 4.89-1.4 8.37-5.83 8.54-10.95.17-5.31-3.25-10.09-8.33-11.65-6.9-2.11-7.19-10.57-7.2-11.59.03-6.24-4.8-11.41-11.03-11.81-.25-.02-.51-.02-.77-.02zM316.54 65.89c.05 0 .1 0 .15.01.95.06 1.69.85 1.68 1.8 0 .68.06 16.85 14.27 21.18a1.782 1.782 0 01-.11 3.44c-.44.11-11.13 3.01-13.25 21.91-.1.9-.85 1.58-1.76 1.58h-.02c-.89 0-1.65-.67-1.77-1.55-.02-.17-2.33-16.81-15.06-20.61-.71-.21-1.24-.86-1.29-1.61-.08-1.27.98-1.75 1.49-1.97 7.9-3.53 12.72-11.34 13.94-22.59.1-.89.85-1.59 1.73-1.59zm0-10c-6 0-11.02 4.52-11.67 10.52-.83 7.62-3.55 12.51-8.08 14.54-5.85 2.6-7.65 7.78-7.39 11.76.32 4.89 3.7 9.12 8.4 10.53 5.26 1.57 7.61 9.67 8.02 12.41.8 5.81 5.8 10.17 11.67 10.17h1.15l.51-.12c5.25-.74 9.45-4.96 10.06-10.35 1.2-10.71 5.49-13.13 6.15-13.43 4.89-1.4 8.37-5.83 8.54-10.95.17-5.3-3.25-10.09-8.33-11.64-6.9-2.11-7.19-10.57-7.2-11.59.03-6.21-4.76-11.37-10.95-11.8-.3-.04-.59-.05-.88-.05z"
        fill="#fff"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M251.711 411.75c12.6-.59 33.37-4.39 33.24-3.44-3.81 25.85 4.49 34.43 4.49 34.43s18.51 2.72 32.66-41.51c.08-.26 46.43-13.5 67.37-35.13 23.3-24.07 32.62-33.83 27.5-78.69-3.72-13.01-25.98-48.9-54.61-63.51-9.53-4.86-22.22-16.27-38.17-22.85 0 0-37.57-16.01-40.81-61.32-.32-4.49-4.08-8-8.6-8.04-9.59-.16-24.61 2.73-38.04 10.63-18.05 10.61-10.21-5-34.76 9.26-3.22 1.13-8.84 1.1-8.42 4.48 1.66 12.51 3.62 43.11-13.64 58.86-28.06 25.61-69.56 39.27-81.54 80.52-19.86 68.38 24.57 87.14 57.3 100.46 4.86 1.98 14.46 2.81 23.67 6.12 8.35 3 15.68 39.7 32.72 42.29 0 0 14.96 3.18 5.64-33.82-.37-1.46 23.55 1.75 34 1.26z"
        fill="#fff"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M122.45 376.8s209.72 46.99 296.05-85.57c0 0 27.12 123.38-199.78 119.15 0 .01-62.66-2.64-96.27-33.58z"
        fill="#F7F1E8"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M197.36 433.19s5.87-27.06 22.59-9.95l-5.23-18.89-31.65-6.26 3.57 18.25 10.72 16.85zM284.871 430.09s4.94-14.33 14.48-11c9.55 3.33 5.9 15.18 5.9 15.18l10.81-19.14 4.06-12.83-12.63-3.91-22.44 3.6-.66 11.7.48 16.4z"
        fill="#F7F1E8"
      />
      <Path
        d="M199.03 409.68c-.17 0-.34-.02-.5-.06-2.01-.46-2.89-.65-3.48-.77-1.15-.25-1.27-.27-6.06-1.47l-2.68-.66c-15.87-3.92-42.44-10.47-63.81-25.04-26.35-17.95-36.76-42.74-30.93-73.68 8.08-42.89 35.52-59.8 59.73-74.72 9.96-6.14 19.37-11.93 27.25-19.18 16.42-15.09 14.36-44.84 12.72-56.94-.74-5.79 12.23-11.28 21.85-12.67 3.59-.52 6.12-.13 8.36.21 4.27.66 7.96 1.22 19.48-5.61 13.14-7.8 22.99-9.28 33.71-9.17 5.66.04 10.44 4.48 10.87 10.11 3.26 43.37 47.35 63.07 47.8 63.26 26.51 12.2 48.45 27.78 63.51 45.08 17.9 20.57 26.2 43.26 24.67 67.44-3.2 50.62-67.28 81.74-109.57 90.31l-1.51.31c-4.51.91-4.59.93-7.16 1.23l-2.17.26c-1.24.15-2.38-.73-2.53-1.97-.15-1.24.73-2.38 1.97-2.53l2.19-.26c2.38-.28 2.38-.28 6.79-1.18l1.51-.31c22.6-4.58 47.33-14.93 66.13-27.68 17.21-11.67 38.09-31.28 39.81-58.48 2.68-42.45-28.48-81.85-85.51-108.1-.43-.18-47-20.93-50.47-67.06-.25-3.29-3.06-5.89-6.39-5.91-10.26-.14-19.08 1.25-31.36 8.53-12.92 7.66-17.56 6.95-22.48 6.19-2.11-.32-4.1-.63-7.02-.21-10.03 1.45-17.41 6.05-17.99 7.69 1.74 12.85 3.78 44.27-14.16 60.76-8.21 7.54-17.79 13.45-27.94 19.71-24.56 15.13-49.95 30.78-57.65 71.7-12.76 67.77 60.21 85.78 91.37 93.47l2.69.66c4.72 1.18 4.83 1.2 5.91 1.43.6.13 1.49.32 3.53.78 1.22.28 1.99 1.49 1.71 2.71a2.22 2.22 0 01-2.19 1.82z"
        fill="#01283F"
      />
      <Path
        d="M199.661 225.56a1.892 1.892 0 01-1.48-3.07c21.42-26.9 14.76-49.14 14.69-49.37-.31-.99.24-2.06 1.23-2.37.99-.32 2.05.23 2.37 1.22.31.98 7.43 24.29-15.33 52.87-.38.48-.93.72-1.48.72zM258.671 234.76c-.41 0-.82-.13-1.17-.4-31.22-24.48-19.67-62.54-19.55-62.92a1.89 1.89 0 012.37-1.23c1 .31 1.55 1.37 1.24 2.37-.11.36-10.85 35.98 18.27 58.81.82.64.97 1.83.32 2.65-.37.47-.92.72-1.48.72zM298.911 211.53c-.15 0-.3-.02-.45-.06-34.3-8.47-37.99-47.4-38.02-47.79-.09-1.04.68-1.95 1.72-2.04 1.04-.1 1.95.68 2.04 1.72.03.36 3.52 36.62 35.16 44.44a1.89 1.89 0 011.38 2.29c-.2.86-.98 1.44-1.83 1.44z"
        fill="#ABAABF"
      />
      <Path
        d="M211.691 446.11c-14.38 0-29.32-36.45-31.04-40.78-.46-1.16.11-2.48 1.27-2.95 1.16-.46 2.48.1 2.95 1.27 6.25 15.69 19.3 39.84 27.71 37.82 1.89-.45 3.27-1.52 4.24-3.26 3.8-6.86.07-21.94-1.68-27.17-.4-1.19.24-2.47 1.43-2.87 1.19-.4 2.47.24 2.87 1.43.28.84 6.9 20.8 1.35 30.81-1.6 2.88-4 4.72-7.15 5.48-.66.15-1.31.22-1.95.22zM292.591 444.96c-2.99 0-5.52-1.19-7.33-3.46-6.85-8.59-1.66-30.92-1.04-33.44.3-1.22 1.53-1.96 2.74-1.67 1.22.3 1.96 1.52 1.67 2.74-1.52 6.24-4.45 23.72.18 29.53.97 1.22 2.2 1.78 3.87 1.75 9.38-.13 21.31-24.17 26.62-39.3.42-1.18 1.71-1.8 2.89-1.39 1.18.41 1.8 1.71 1.39 2.89-1.51 4.31-15.23 42.11-30.84 42.33-.05.02-.1.02-.15.02z"
        fill="#01283F"
      />
      <Path
        d="M247.151 414.06c-17.92 0-30.16-1.86-30.35-1.89a2.264 2.264 0 01-1.89-2.59 2.264 2.264 0 012.59-1.89c.32.05 32.22 4.89 68.41-1.32 1.23-.21 2.41.62 2.62 1.85.21 1.23-.62 2.41-1.85 2.62-14.39 2.46-28.12 3.22-39.53 3.22zM220.16 166.95c-14.66 0-25.27-8.1-25.86-8.56-.99-.77-1.16-2.2-.39-3.18.77-.99 2.19-1.17 3.18-.4.2.16 17.62 13.34 37.58 4.47 12.05-5.36 17.51-9.05 21.49-11.75 3.09-2.09 5.53-3.74 9.4-5.01 1.11-.36 2.12-.69 3.05-.99 6.02-1.93 8.28-2.65 12.07-6.24.91-.86 2.35-.82 3.21.09.86.91.82 2.35-.09 3.21-4.55 4.3-7.64 5.29-13.81 7.26-.92.3-1.92.62-3.02.98-3.27 1.07-5.26 2.42-8.28 4.46-4.12 2.79-9.77 6.61-22.19 12.13-5.76 2.57-11.29 3.53-16.34 3.53z"
        fill="#01283F"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M337.51 226.66c-21.77.04-45.31 3.02-66.82 11.88-13.84-7.23-26.56-4.48-35.49-.31-64.07-22.71-143.49 5.25-143.49 5.25l.36 15.72 6.15-.59c2.01 22.01 11.46 54.5 20.07 64.24 17.49 19.77 54.45 14.29 54.45 14.29 51.56-3.44 63.18-49.44 65.5-77.08 11.55-5.84 23.11-3.42 31.75.41 3.28 27.6 16.49 72.43 67.69 73.91 0 0 37.11 4.08 53.99-16.34 8.32-10.06 16.79-42.89 18.15-64.97l6.16.36-.11-15.72c.01.01-35.74-11.12-78.36-11.05z"
        fill="#002038"
      />
      <Mask
        id="a"
        maskUnits="userSpaceOnUse"
        x={91}
        y={226}
        width={325}
        height={112}>
        <Path
          d="M337.51 226.66c-21.77.04-45.31 3.02-66.82 11.88-13.84-7.23-26.56-4.48-35.49-.31-64.07-22.71-143.49 5.25-143.49 5.25l.36 15.72 6.15-.59c2.01 22.01 11.46 54.5 20.07 64.24 17.49 19.77 54.45 14.29 54.45 14.29 51.56-3.44 63.18-49.44 65.5-77.08 11.55-5.84 23.11-3.42 31.75.41 3.28 27.6 16.49 72.43 67.69 73.91 0 0 37.11 4.08 53.99-16.34 8.32-10.06 16.79-42.89 18.15-64.97l6.16.36-.11-15.72c.01.01-35.74-11.12-78.36-11.05z"
          fill="#fff"
        />
      </Mask>
      <G mask="url(#a)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M372.3 219.49c-13.91-.19-21.03 1.65-21.03 1.65s-44.8 40.51-25.21 59.71c22.41 21.96-17.66 52.31-17.66 52.31s18.73 13.56 34.49 9.05c15.76-4.51 41.45-32.75 23.69-57.35s16.59-51.1 16.59-51.1 13.84-12.35 5.29-13.27c-6.13-.66-11.52-.94-16.16-1zm-187.6.78c-13.91-.19-21.03 1.65-21.03 1.65s-44.8 40.52-25.21 59.72c22.41 21.96-17.66 52.31-17.66 52.31s18.73 13.56 34.49 9.05c15.76-4.51 41.45-32.75 23.69-57.35s16.6-51.1 16.6-51.1 13.83-12.35 5.28-13.27c-6.13-.65-11.53-.95-16.16-1.01z"
          fill="#3C6583"
        />
      </G>
      <Path
        d="M245.52 343.31c-4.34 0-7.23-.69-7.31-.71a2.267 2.267 0 01-1.65-2.75c.3-1.21 1.54-1.96 2.75-1.65.91.22 21.57 5 34.29-14.92a2.265 2.265 0 013.13-.69c1.06.67 1.37 2.08.69 3.13-9.58 15.01-23.48 17.59-31.9 17.59z"
        fill="#002038"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M92.03 316.72s-14.09 40.58-1.99 53.9c6.88 7.58 16.56-5.7 16.39-6.12-1.23-2.91-15.02-15.32-14.4-47.78z"
        fill="#fff"
      />
      <Path
        d="M94.85 375.24c-2.41 0-4.63-1.03-6.49-3.09-12.86-14.16.93-54.46 1.53-56.17a2.268 2.268 0 014.41.79c-.5 26.45 8.6 38.89 12.49 44.2.86 1.17 1.42 1.95 1.73 2.66 1.25 2.95-6.49 8.95-7.4 9.54-2.18 1.37-4.3 2.07-6.27 2.07zm-4.42-44.59c-3.14 13.5-5.28 31.22 1.28 38.44 1.12 1.24 2.3 1.73 3.71 1.55 3.35-.42 6.92-4.29 8.33-6.14-.2-.28-.42-.58-.63-.87-3.1-4.24-10.4-14.21-12.69-32.98z"
        fill="#01283F"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M419.971 306.31s14.09 40.58 1.99 53.91c-6.88 7.58-16.57-5.7-16.39-6.13 1.23-2.91 15.02-15.31 14.4-47.78z"
        fill="#fff"
      />
      <Path
        d="M417.151 364.83c-1.97 0-4.08-.69-6.25-2.08-.92-.59-8.66-6.59-7.41-9.55.3-.71.86-1.48 1.72-2.65 3.89-5.31 12.99-17.74 12.49-44.2-.02-1.12.77-2.08 1.87-2.28 1.1-.19 2.18.44 2.54 1.49.59 1.71 14.38 42.02 1.53 56.17-1.86 2.07-4.07 3.1-6.49 3.1zm-8.91-10.73c1.41 1.85 4.98 5.72 8.33 6.14 1.41.18 2.59-.31 3.71-1.55 6.56-7.23 4.42-24.94 1.28-38.44-2.28 18.77-9.59 28.75-12.7 32.99-.2.28-.42.58-.62.86z"
        fill="#01283F"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M373.371 194.7c-.57-.17 13.14-3.4 15.41-24.27 0 0-.17 18.11 15.53 22.9 0 0-12.31 2.91-14.61 23.45-.01.01-2.29-17.9-16.33-22.08z"
        fill="#FFD444"
      />
      <Path
        d="M389.691 218.57c-.89 0-1.65-.67-1.77-1.55-.02-.17-2.33-16.81-15.07-20.61-.71-.21-1.24-.86-1.29-1.61-.08-1.27.98-1.75 1.49-1.97 7.9-3.53 12.72-11.34 13.94-22.59.1-.95.93-1.65 1.88-1.59.95.06 1.69.85 1.68 1.8 0 .68.06 16.84 14.27 21.18.77.24 1.29.96 1.26 1.76-.03.8-.59 1.49-1.37 1.68-.44.11-11.13 3.01-13.25 21.91-.1.9-.85 1.58-1.76 1.58 0 .01 0 .01-.01.01zm-12.15-24.11c6.44 3.33 9.97 9.44 11.87 14.4 2.54-8.86 7.13-13.27 10.47-15.41-6.4-3.32-9.62-8.99-11.24-13.87-2.21 6.57-5.99 11.66-11.1 14.88z"
        fill="#01283F"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M114.371 175.22c-.57-.17 13.14-3.4 15.41-24.27 0 0-.17 18.11 15.53 22.9 0 0-12.31 2.91-14.61 23.45 0 0-2.29-17.9-16.33-22.08z"
        fill="#FFD444"
      />
      <Path
        d="M130.7 199.09c-.89 0-1.65-.67-1.77-1.55-.02-.17-2.33-16.81-15.06-20.61a1.81 1.81 0 01-1.29-1.61c-.08-1.27.98-1.75 1.49-1.97 7.9-3.53 12.72-11.34 13.94-22.59.1-.95.93-1.65 1.88-1.59.95.06 1.69.85 1.68 1.8 0 .68.06 16.85 14.27 21.18.77.24 1.29.96 1.26 1.76-.03.8-.59 1.49-1.37 1.68-.44.11-11.13 3.01-13.25 21.91-.1.9-.85 1.58-1.76 1.58-.01.01-.02.01-.02.01zm-12.15-24.11c6.44 3.33 9.97 9.44 11.87 14.4 2.54-8.86 7.13-13.27 10.47-15.4-6.4-3.31-9.62-8.98-11.24-13.87-2.21 6.56-5.99 11.65-11.1 14.87z"
        fill="#01283F"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M301.171 91.94c-.57-.17 13.14-3.4 15.41-24.27 0 0-.17 18.11 15.53 22.9 0 0-12.31 2.91-14.62 23.45 0 .01-2.28-17.9-16.32-22.08z"
        fill="#FFD444"
      />
      <Path
        d="M317.49 115.81c-.89 0-1.649-.67-1.769-1.55-.02-.17-2.33-16.81-15.06-20.61a1.825 1.825 0 01-1.291-1.61c-.08-1.27.98-1.75 1.49-1.97 7.9-3.53 12.72-11.34 13.94-22.59.1-.95.94-1.67 1.88-1.59.95.06 1.69.85 1.68 1.8 0 .68.061 16.85 14.271 21.18.77.24 1.29.96 1.26 1.76-.03.8-.591 1.49-1.371 1.68-.44.11-11.13 3.01-13.25 21.91-.1.9-.849 1.58-1.759 1.58-.01.01-.011.01-.021.01zm-12.139-24.1c6.44 3.33 9.97 9.44 11.87 14.4 2.54-8.86 7.13-13.27 10.47-15.4-6.4-3.32-9.62-8.98-11.24-13.87-2.21 6.55-6 11.65-11.1 14.87z"
        fill="#01283F"
      />
      <Path
        d="M161.001 339.77c-12.68 0-32.4-2.39-44.13-15.66-8.89-10.05-18.02-41.72-20.35-63.43l-4.27.41a1.91 1.91 0 01-1.44-.47c-.39-.35-.62-.85-.63-1.37l-.36-15.72c-.02-.82.49-1.55 1.26-1.83.8-.28 80.19-27.71 144.03-5.5 8.64-3.88 21.58-6.74 35.68.27 19.09-7.72 41.53-11.65 66.73-11.7h.41c42.24 0 78.17 11.03 78.53 11.15.79.24 1.32.97 1.33 1.79l.11 15.72a1.898 1.898 0 01-2 1.9l-4.29-.25c-1.69 21.79-9.87 53.8-18.45 64.18-17.12 20.7-53.16 17.28-55.58 17.03-52.11-1.55-65.82-46.82-69.31-74.5-10.22-4.29-19.7-4.46-28.22-.49-2.55 28.02-14.76 74.2-67.09 77.73-.84.12-5.48.74-11.96.74zm-62.79-83.04c.44 0 .87.15 1.21.44.39.32.63.78.68 1.28 2.11 23.08 11.82 54.36 19.61 63.16 16.59 18.76 52.4 13.72 52.76 13.67.05-.01.1-.01.15-.02 50.24-3.35 61.5-48.65 63.74-75.35.05-.65.44-1.23 1.03-1.53 9.95-5.03 21.49-4.9 33.37.37.61.27 1.03.84 1.11 1.5 3.13 26.36 15.85 70.8 65.87 72.25.05 0 .1 0 .15.01.36.04 36.3 3.72 52.33-15.67 7.52-9.09 16.3-40.73 17.72-63.88.06-1.04.96-1.84 2-1.77l4.15.24-.08-12.3c-6.8-1.95-38.96-10.59-76.08-10.59h-.4c-25.05.04-47.29 3.99-66.1 11.74-.52.21-1.1.19-1.6-.07-10.78-5.63-22.15-5.72-33.82-.27-.45.21-.96.23-1.43.07-58.27-20.66-130.43 1.39-140.94 4.82l.28 12.3 4.12-.4h.17z"
        fill="#3C6583"
      />
    </Svg>
  );
};
