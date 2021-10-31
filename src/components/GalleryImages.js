import { graphql, useStaticQuery } from 'gatsby';

export const GalleryQuery = () => {

  const data = useStaticQuery(graphql`
    query {
      contentfulImageGallery {
        images: projects {
          id
          before {
            id
            main: gatsbyImageData(placeholder: BLURRED)
            thumb: gatsbyImageData(placeholder: BLURRED, width: 212)
          }
          after {
            id
            main: gatsbyImageData(placeholder: BLURRED)
            thumb: gatsbyImageData(placeholder: BLURRED, width: 212)
          }
        }
      }
    }
  `);

  return data.contentfulImageGallery.images;

};

export const CreateMasterArray = () => {

    const images = GalleryQuery();

    let array = [];

    for(let index in images) {

        for(let item in images[index].before) {
            array.push(images[index].before[item]);
        };

        for(let item in images[index].after) {
            array.push(images[index].after[item]);
        };
    };

    return array;

};