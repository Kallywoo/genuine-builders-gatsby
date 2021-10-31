import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

export default function SEO({ children, location, description, title, image }) {
    const { site } = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    title
                    description
                }
            }
        }
    `);
    return (
        <Helmet titleTemplate={`%s - ${site.siteMetadata.title}`}>
            <html lang="en" />
            <title>{title}</title>
            {/* meta tags */}
            <link rel="icon" href="/favicon.ico"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <meta charSet="utf-8"/>
            <meta name="keywords" content="Genuine Builders,Genuine Builders York,Builders York,Extensions York,Construction York,Genuine,Builders,York"/>
            <meta name="description" content={site.siteMetadata.description}/>
            {/* open graph */}
            {location && <meta property="og:url" content={location.href}/>}
            {/* vv create a logo for this vv */}
            {/* <meta property="og:image" content={image || '/logo.svg'}/> */}
            <meta property="og:title" content={title} key="ogtitle"/>
            <meta property="og:site_name" content={site.siteMetadata.title} key="ogsitename"/>
            <meta property="og:description" content={description} key="ogdesc"/>
            {children}
        </Helmet>
    );
};