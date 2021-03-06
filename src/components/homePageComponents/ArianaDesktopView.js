import React from "react"
// import Image from "../components/image";
import styled from "styled-components"
import { styles } from "../../utils"
// import img from "../images/bcg/homeBcg.jpeg";
import { StaticQuery, graphql, Link } from "gatsby"
import ContextConsumer from "../Context"

const GET_IMAGE = graphql`
  query {
    getImage2: file(relativePath: { eq: "bcg/home0.JPG" }) {
      childImageSharp {
        fluid(maxWidth: 3000) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
  }
`

export default function ArianaDesktopView() {
  return (
    <ContextConsumer>
      {({ isFarsi, setAboutArianaTabNo }) => (
        <StaticQuery
          query={GET_IMAGE}
          render={data => {
            const image = data.getImage2.childImageSharp.fluid
            return (
              <GalleryWrapper img={image}>
                {isFarsi ? (
                  <div className="hero-text" style={{ direction: "rtl" }}>
                    <h1>
                      سلام!
                      <br />
                      <span
                        style={{
                          whiteSpace: "nowrap",
                          color: `${styles.colors.mainYellow}`,
                        }}
                      >
                        آریانا بریوینگ
                      </span>{" "}
                      <br />
                      هستم
                    </h1>
                    <br />
                    <br />
                    <p>آیا علاقمندید که من را بیشتر بشناسید؟</p>
                    <Link
                      to="/about"
                      style={{ textDecoration: "none" }}
                      state={{
                        tabNo: 2,
                      }}
                    >
                      <button
                        style={{ fontFamily: "Vazir" }}
                        onClick={() => {
                          setAboutArianaTabNo(2)
                        }}
                      >
                        درباره آریانا
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div
                    className="hero-text"
                    style={{ fontFamily: "Righteous" }}
                  >
                    <h1 style={{ padding: "0.27rem 0" }}>
                      HEY! I AM{" "}
                      <span
                        style={{
                          whiteSpace: "nowrap",
                          color: `${styles.colors.mainYellow}`,
                        }}
                      >
                        ARIANA BRAVING
                      </span>{" "}
                      <br />
                      <br />
                    </h1>
                    <br />

                    {/* <p>and I am a life and wellness coach</p> */}
                    <p style={{ padding: "0.27rem 0" }}>
                      Are you curious to hear my story?
                    </p>

                    <Link to="/about" style={{ textDecoration: "none" }}>
                      <button
                        onClick={() => {
                          setAboutArianaTabNo(0)
                        }}
                      >
                        About Ariana
                      </button>
                    </Link>
                    <br />
                    <br />
                  </div>
                )}
              </GalleryWrapper>
            )
          }}
        />
      )}
    </ContextConsumer>
  )
}

const GalleryWrapper = styled.div`
  background: linear-gradient(
      270deg,
      rgba(0, 0, 0, 0.05) 55%,
      rgba(0, 0, 0, 0.5) 75%
    ),
    url(${props => props.img.src});
  min-height: calc(100vh);
  background-position: center top;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-color: #464646;
  position: relative;

  .hero-text {
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
  }
  .hero-text p {
    margin: auto;
    font-size: 1rem;
  }
  .hero-text h1 {
    margin: 1.5rem auto;
    color: ${styles.colors.mainWhite};
    font-size: 2rem;
    line-height: 3.5rem;
    /* letter-spacing: 0.2rem; */
    font-weight: 700;
  }

  .hero-text button {
    margin: 1rem auto;
    color: ${styles.colors.mainWhite};
    background: transparent;
    padding: 0.5rem 1rem;
    text-transform: uppercase;
    font-size: 1.3rem;
    line-height: 2.5rem;
    /* letter-spacing: 0.2rem; */
    font-weight: 700;
    ${styles.border({ color: `${styles.colors.mainWhite}` })};
    ${styles.transition({})};
    &:hover {
      background: ${styles.colors.mainYellow};
      color: ${styles.colors.mainWhite};
      cursor: pointer;
    }
  }

  @media (min-width: ${styles.navbarHandle.length}) {
    .hero-text {
      max-width: 450px;
      text-align: center;
      position: absolute;
      top: 50%;
      left: 05%;
      transform: translate(-10%, -50%);
      color: white;
    }
    .hero-text p {
      margin: auto;
      font-size: 1.4rem;
    }
    .hero-text h1 {
      margin: 2rem auto;
      color: ${styles.colors.mainWhite};
      font-size: 2.5rem;
      line-height: 3.5rem;
      /* letter-spacing: 0.2rem; */
      font-weight: 700;
    }
  }
  @media (max-height: 500px), (max-width: ${styles.navbarHandle.length}) {
    .hero-text p {
      margin: auto;
      font-size: 1rem;
    }
    .hero-text h1 {
      margin: 1.5rem auto;
      color: ${styles.colors.mainWhite};
      text-transform: uppercase;
      font-size: 1.8rem;
      line-height: 3.5rem;
      /* letter-spacing: 0.2rem; */
      font-weight: 700;
    }
  }
`
