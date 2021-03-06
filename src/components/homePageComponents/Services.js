import React from "react"
import Img from "gatsby-image"
import { StaticQuery, graphql } from "gatsby"
import { Section, Title, ServiceButton } from "../../utils"
import styled from "styled-components"
import ContextConsumer from "../Context"
import truncatise from "truncatise"

const GET_IMAGES = graphql`
  query {
    getImages: allFile(
      filter: { relativeDirectory: { eq: "serviceGallery" } }
      sort: { fields: [name], order: ASC }
    ) {
      edges {
        node {
          childImageSharp {
            fluid(maxWidth: 900) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
    }
  }
`
export default function Service() {
  var options = {
    TruncateBy: "words", // Options are 'words', 'characters' or 'paragraphs'
    TruncateLength: 190, // The count to be used with TruncatedBy
    StripHTML: false, // Whether or not the truncated text should contain HTML tags
    Strict: true, // If set to false the truncated text finish at the end of the word
    Suffix: " ...", // Text to be appended to the end of the truncated text
  }
  return (
    <ContextConsumer>
      {({ isFarsi }) => (
        <StaticQuery
          query={GET_IMAGES}
          render={data => {
            return (
              <Section>
                {isFarsi ? (
                  <Title
                    style={{ direction: "rtl" }}
                    title="خدمات آریانا"
                    message={"چگونه می توانم به شما کمک کنم؟"}
                  />
                ) : (
                  <Title
                    title="Ariana's Services"
                    message={"How Can I Help You?"}
                  />
                )}
                <ServiceWrapper>
                  {data.getImages.edges.map(({ node }, index) => {
                    index = index + 1
                    return (
                      <div className={`item item-${index}`} key={index}>
                        <Img fluid={node.childImageSharp.fluid} />
                        {index === 1 && isFarsi ? (
                          <div>
                            <h2 className="service"> دوره های آنلاین </h2>
                            <p className="text">
                              Amet eiusmod est ut Lorem incididunt ex aute nulla
                              qui duis ullamco tempor. Laborum adipisicing minim
                              nulla duis commodo ut pariatur minim consectetur
                              exercitation ex laboris excepteur.
                            </p>
                            <ServiceButton
                              style={{
                                margin: " 1rem auto",
                                fontFamily: "Vazir",
                              }}
                            >
                              اطلاعات بیشتر
                            </ServiceButton>
                          </div>
                        ) : index === 1 && !isFarsi ? (
                          <div>
                            <h2 className="service"> Online Courses </h2>
                            <p className="text">
                              Amet eiusmod est ut Lorem incididunt ex aute nulla
                              qui duis ullamco tempor. Laborum adipisicing minim
                              nulla duis commodo ut pariatur minim consectetur
                              exercitation ex laboris excepteur.
                            </p>
                            <ServiceButton style={{ margin: " 1rem auto" }}>
                              More Info
                            </ServiceButton>
                          </div>
                        ) : index === 2 && isFarsi ? (
                          <div>
                            <h2 className="service"> کوچینگ گروهی </h2>
                            <p className="text textFR">
                              {truncatise(
                                ` برای برخی از افراد کوچینگ گروهی موثرتر و مفیدتر از
                              کوچینگ خصوصی است! قرار گرفتن در کنار چند همسفر که
                              مشکلات نسبتاً مشابهی دارند و می خواهند به مقصد
                              مشترکی برسند می تواند بسیار مفید و قدرت بخش باشد.
                              خیلی اوقات شنیدن مشکلات و درک افکار محدود کننده
                              دیگران چون زنگ بیدار باشی است که باعث شناسایی
                              افکار محدود کننده و نقاط کور خود ما می شود.`,
                                options
                              )}
                            </p>
                            <ServiceButton
                              style={{
                                margin: " 1rem auto",
                                fontFamily: "Vazir",
                              }}
                            >
                              شروع کنید
                            </ServiceButton>
                          </div>
                        ) : index === 2 && !isFarsi ? (
                          <div>
                            <h2 className="service"> Group Coaching </h2>
                            <p className="text">
                              Amet eiusmod est ut Lorem incididunt ex aute nulla
                              qui duis ullamco tempor. Laborum adipisicing minim
                              nulla duis commodo ut pariatur minim consectetur
                              exercitation ex laboris excepteur.
                            </p>
                            <ServiceButton style={{ margin: " 1rem auto" }}>
                              Let's go
                            </ServiceButton>
                          </div>
                        ) : index === 3 && isFarsi ? (
                          <div>
                            <h2 className="service"> کوچینگ خصوصی </h2>
                            <p className="text textFR">
                              {truncatise(
                                `
                              چه چیزی را با همه وجودت، با تک تک سلولهای بدنت، می
                              خواهی در زندگیت تجربه کنی؟ آرامش بیشتر؟ اعتماد به
                              نفس بیشتر؟ عشق بیشتر؟ موفقیت بیشتر؟ انرژی بیشتر؟
                              پول بیشتر؟ یا... جواب شما هر چه که هست تمام یا
                              بخشی از زندگی ایده آل شماست و کار آریانا به عنوان
                              یک کوچ این است که به شما یاد می دهد چطور زندگی
                              ایده آلتان را برای خود خلق کنید. چه معامله ای از
                              این بهتر؟`,
                                options
                              )}
                            </p>
                            <ServiceButton
                              style={{
                                margin: " 1rem auto",
                                fontFamily: "Vazir",
                              }}
                            >
                              بفرمایید لطفا
                            </ServiceButton>
                          </div>
                        ) : (
                          <div>
                            <h2 className="service"> Private Sessions </h2>
                            <p className="text">
                              Amet eiusmod est ut Lorem incididunt ex aute nulla
                              qui duis ullamco tempor. Laborum adipisicing minim
                              nulla duis commodo ut pariatur minim consectetur
                              exercitation ex laboris excepteur.
                            </p>
                            <ServiceButton style={{ margin: " 1rem auto" }}>
                              Help Yourself
                            </ServiceButton>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </ServiceWrapper>
              </Section>
            )
          }}
        />
      )}
    </ContextConsumer>
  )
}

const ServiceWrapper = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-row-gap: 1rem;
  .service {
    margin-top: 1rem;
    text-align: center;
    letter-spacing: 0.1rem;
  }
  .text {
    padding: 1rem 2rem;
    text-align: justify;
  }
  .textFR {
    direction: rtl;
  }
  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 1rem;
  }

  @media (min-width: 980px) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 1rem;
  }
`
