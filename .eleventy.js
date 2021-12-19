const { DateTime } = require("luxon");

module.exports = (eleventyConfig) => {
    // Filters let you modify the content https://www.11ty.dev/docs/filters/
    eleventyConfig.addFilter("htmlDateString", dateObj => {
      return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
    });

    eleventyConfig.addCollection("posts", function(collection) {
    
        /* The posts collection includes all posts that list 'posts' in the front matter 'tags'
           - https://www.11ty.dev/docs/collections/
        */
        
        // EDIT HERE WITH THE CODE FROM THE NEXT STEPS PAGE TO REVERSE CHRONOLOGICAL ORDER
        // (inspired by https://github.com/11ty/eleventy/issues/898#issuecomment-581738415)
        const coll = collection
          .getFilteredByTag("posts").sort((a, b) => b.data.date - a.data.date);
    
        // From: https://github.com/11ty/eleventy/issues/529#issuecomment-568257426 
        // Adds {{ prevPost.url }} {{ prevPost.data.title }}, etc, to our njks templates

        //   for (let i = 0; i < coll.length; i++) {
        //     const prevPost = coll[i - 1];
        //     const nextPost = coll[i + 1];
      
        //     coll[i].data["prevPost"] = prevPost;
        //     coll[i].data["nextPost"] = nextPost;
        //   }
      
           return coll;
        });

  eleventyConfig.addPassthroughCopy({'src/css': 'css'})
    
  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "build"
    }
  };
};
