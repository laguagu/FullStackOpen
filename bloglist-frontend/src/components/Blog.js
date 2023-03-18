const Blog = ({blog}) => (
  <div>
    Title: {blog.title} | Author: {blog.author} | {blog.url}
  </div>  
)

export default Blog