import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import WrapperGrid from '../components/WrapperGrid'
import HomeBody from '../components/Home/HomeBody'
import HomeBodyBottom from '../components/Home/HomeBodyBottom'
import HomeList from '../components/Home/HomeList'

import SEO from '../components/SEO'

const Index = ({ data, location }) => {
  const galleries = data.allContentfulExtendedGallery.edges
  return (
    <Layout location={location}>
      <SEO />
      <WrapperGrid>
        <HomeBody>
          <HomeBodyBottom>
            {galleries.map(({ node: gallery }) => (
              <HomeList
                key={gallery.id}
                slug={gallery.slug}
                image={gallery.heroImage}
                title={gallery.title}
                year={gallery.year}
                tags={gallery.tags}
                date={gallery.publishDate}
                excerpt={gallery.body}
              />
            ))}
          </HomeBodyBottom>
        </HomeBody>
      </WrapperGrid>
    </Layout>
  )
}

export const query = graphql`
  query Index {
    allContentfulExtendedGallery(limit: 20) {
      edges {
        node {
          title
          id
          slug
          heroImage {
            title
            fluid(maxWidth: 1000) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
      }
    }
    contentfulPost {
      title
      id
      heroImage {
        title
        fluid(maxWidth: 1000) {
          ...GatsbyContentfulFluid_withWebp
        }
        ogimg: resize(width: 900) {
          src
          width
          height
        }
      }
    }
  }
`

export default Index
