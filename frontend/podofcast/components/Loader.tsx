import "@/app/styles/loader.css";

const Loader = () => {
  return (
    <svg className="loader" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 350" width={60} height={30}>
      <defs>
        <filter id="goo">
          <feGaussianBlur
            id="SvgjsFeGaussianBlur1000"
            result="SvgjsFeGaussianBlur1000"
            in="SourceGraphic"
            stdDeviation="10"
          ></feGaussianBlur>
          <feColorMatrix
            id="SvgjsFeColorMatrix1001"
            result="SvgjsFeColorMatrix1001"
            in="SvgjsFeGaussianBlur1000"
            values="
            1 0 0 0 0                                      
            0 1 0 0 0
            0 0 1 0 0
            0 0 0 30 -10"
            type="matrix"
          ></feColorMatrix>
          <feComposite
            id="SvgjsFeComposite1002"
            result="SvgjsFeComposite1002"
            in="SvgjsFeColorMatrix1001"
            operator="atop"
          ></feComposite>
        </filter>
        <linearGradient
          id="g"
          x1="100%"
          x2="0"
          y1="0"
          y2="80%"
          gradientTransform="rotate(10)"
        >
          <stop offset="10%" stopColor="hsl(203 39% 65%)" />
          <stop offset="30%" stopColor="hsl(8 61% 50%)" />
          <stop offset="50%" stopColor="hsl(203 39% 65%)" />
          <stop offset="70%" stopColor="hsl(8 61% 50%)" />
          <stop offset="90%" stopColor="hsl(203 39% 65%)" />
        </linearGradient>
        <mask id="mask">
          <g>
            <circle cx="50" cy="25" r="25" fill="white"></circle>
            <line
              x1="50"
              x2="50"
              y1="100"
              y2="250"
              stroke-width="50"
              stroke="white"
              stroke-linecap="round"
            ></line>
            <circle cx="50" cy="325" r="25" fill="white"></circle>
          </g>
          <g>
            <circle cx="150" cy="25" r="25" fill="white"></circle>
            <line
              x1="150"
              x2="150"
              y1="100"
              y2="250"
              stroke-width="50"
              stroke="white"
              stroke-linecap="round"
            ></line>
            <circle cx="150" cy="325" r="25" fill="white"></circle>
          </g>
          <g>
            <circle cx="250" cy="25" r="25" fill="white"></circle>
            <line
              x1="250"
              x2="250"
              y1="100"
              y2="250"
              stroke-width="50"
              stroke="white"
              stroke-linecap="round"
            ></line>
            <circle cx="250" cy="325" r="25" fill="white"></circle>
          </g>
          <g>
            <circle cx="350" cy="25" r="25" fill="white"></circle>
            <line
              x1="350"
              x2="350"
              y1="100"
              y2="250"
              stroke-width="50"
              stroke="white"
              stroke-linecap="round"
            ></line>
            <circle cx="350" cy="325" r="25" fill="white"></circle>
          </g>
          <g>
            <circle cx="450" cy="25" r="25" fill="white"></circle>
            <line
              x1="450"
              x2="450"
              y1="100"
              y2="250"
              stroke-width="50"
              stroke="white"
              stroke-linecap="round"
            ></line>
            <circle cx="450" cy="325" r="25" fill="white"></circle>
          </g>
          <g>
            <circle cx="550" cy="25" r="25" fill="white"></circle>
            <line
              x1="550"
              x2="550"
              y1="100"
              y2="250"
              stroke-width="50"
              stroke="white"
              stroke-linecap="round"
            ></line>
            <circle cx="550" cy="325" r="25" fill="white"></circle>
          </g>
          <g>
            <circle cx="650" cy="25" r="25" fill="white"></circle>
            <line
              x1="650"
              x2="650"
              y1="100"
              y2="250"
              stroke-width="50"
              stroke="white"
              stroke-linecap="round"
            ></line>
            <circle cx="650" cy="325" r="25" fill="white"></circle>
          </g>
        </mask>
      </defs>
      <g filter="url(#goo)">
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="url(#g)"
          mask="url(#mask)"
        ></rect>
      </g>
    </svg>
  );
};

export default Loader;
