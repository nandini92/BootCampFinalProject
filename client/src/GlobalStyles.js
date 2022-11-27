import { createGlobalStyle } from "styled-components";


export default createGlobalStyle`
  :root {
    --color-yellow: #FDD85D;
    --color-red: #F14B3D;
    --color-blue: #3276CC;
    --color-purple: #363b81;
    --color-grey: #F8F9FA;
    --color-dark-grey: #595F65;
    --font: "Poppins",sans-serif;
  }
  
  /* http://meyerweb.com/eric/tools/css/reset/
      v2.0 | 20110126
      License: none (public domain)
  */

      html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
      margin: 0;
      padding: 0;
      border: 0;
      box-sizing: border-box;
      font-size: 100%;
      vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
      display: block;
  }
  body {
      line-height: 1;
  }
  ol, ul {
      list-style: none;
  }
  blockquote, q {
      quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
      content: '';
      content: none;
  }

h1,
h2,
h3,
label {
  color: #fff;
  font-family: var(--font);
  font-size: 32px;
  text-align: center;
}
button {
  color: #fff;
  font-family: var(--font);
  font-size: 22px;
  padding: 5px 10px;
  text-align: center;
  border: none;
  border-radius: 5px;
  background-color: var(--color-purple);
  color: var(--color-grey);
}
p,
a,
li,
blockquote,
input {
  font-family: var(--font);
}
`;