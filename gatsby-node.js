/*exports.createPages = async ({ actions, graphql }) => {
    // const { data } = await graphql(`
    //   query {
    //     lolly{
    //     recepientName
    //     message
    //     senderName
    //     flavourTop
    //     flavourMiddle
    //     flavourBottom
    //     lollyPath
    //     }
    // }
    // `)
  
    // console.log('data from graphql source',data)
    // data.forEach(x => {
      actions.createPage({
        path: `somepath`,
        component: require.resolve(`./src/templates/LollyPage.js`),
        context: { 
            // Data passed to context is available
            // in pageContext props of the template component
            name: "Zia",
         },
      })
    // })
  }
  */


//   exports.createPages = async function ({ actions, graphql}) {
  
  

//   actions.createPage({
//       path: "my-dynamic-page",
//       component: require.resolve(`./src/templates/dynamic-page.js`),
//       context: { 
//           // Data passed to context is available
//           // in pageContext props of the template component
//           name: "Zia",
//        },
//   });
//   console.log("End of Gatsby Node File");
// }


exports.createPages = async ({ actions, graphql }) => {
  const { data } = await graphql(`
  {
    swapi {
      lolly {
        lollyPath
      }
    }
  }
  `)

  console.log("data from graphql source",data)

  data.swapi.lolly.forEach(d => {
    actions.createPage({
      path: `${d.lollyPath}`,
      component: require.resolve(`./src/templates/dynamic-page.js`),
      context: {
        path: d.lollyPath,
      },
    })
  })


  
}

