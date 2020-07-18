import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import config from '../utils/siteConfig'
import Layout from '../components/Layout'
import WrapperGrid from '../components/WrapperGrid'
import Hero from '../components/Hero'
import BlogBody from '../components/Blog/BlogBody'
import BlogList from '../components/Blog/BlogList'
import SEO from '../components/SEO'

const Blog = ({ data, location }) => {
  const posts = data.allContentfulPost.edges
  const blog = data.contentfulBlog

  console.log('Blog -> posts', posts)

  return (
    <Layout location={location}>
      <Helmet>
        <title>{`${config.siteTitle} - Blog`}</title>
      </Helmet>
      <SEO postNode={blog} pagePath="contact" customTitle pageSEO />
      <WrapperGrid>
        <BlogBody>
          {posts.map(({ node: post }) => (
            <BlogList
              key={post.id}
              slug={post.slug}
              image={post.heroImage}
              title={post.title}
              date={post.publishDate}
              time={post.body.childMarkdownRemark.timeToRead}
              excerpt={post.body}
            />
          ))}
        </BlogBody>
      </WrapperGrid>
    </Layout>
  )
}

export const query = graphql`
  query {
    allContentfulPost(limit: 1000) {
      edges {
        node {
          title
          id
          slug
          publishDate(formatString: "DD MMM YYYY")
          heroImage {
            title
            fluid(maxWidth: 1000) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
      }
    }
  }
`

export default Blog
