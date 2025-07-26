
import {createClient} from 'https://cdn.jsdelivr.net/npm/@sanity/client/+esm'

const client = createClient({
  projectId: '7i52kxea',
  dataset: 'blog',
  apiVersion: '2022-03-07',
  useCdn: false,
});

async function fetchBlogPosts() {
  const query = `*[_type == "post"]{
    _id,
    title,
    "mainImage": mainImage.asset->url
  }`;

  const posts = await client.fetch(query);
  console.log('Posts received from Sanity:', posts); 

  const container = document.getElementById('blog-posts-container');
  console.log('Found container element:', container); 

  posts.forEach(post => {
    const postElement = document.createElement('div');
    const titleElement = document.createElement('h3');
    titleElement.textContent = post.title;
    postElement.appendChild(titleElement);

    if (post.mainImage) {
      const imageElement = document.createElement('img');
      imageElement.src = post.mainImage;
      postElement.appendChild(imageElement);
    }
    container.appendChild(postElement);
  });
}

fetchBlogPosts();