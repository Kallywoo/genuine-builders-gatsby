import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

import favicon from '/static/favicon.svg';
import altFavicon from '/static/favicon.ico';
import logo from '/src/images/temp/logo.png';

export default function SEO({ children, location, description, title }) {
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
            <link rel="icon" type="image/svg+xml" href={favicon}/>
            <link rel="alternate icon" href={altFavicon}/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <meta charSet="utf-8"/>
            <meta name="keywords" content="Genuine Builders,Genuine Builders York,Builders York,Extensions York,Construction York,Genuine,Builders,York"/>
            <meta name="description" content={site.siteMetadata.description}/>
            {/* open graph */}
            {location && <meta property="og:url" content={location.href}/>}
            <meta property="og:image" content={logo}/>
            <meta property="og:title" content={title} key="ogtitle"/>
            <meta property="og:site_name" content={site.siteMetadata.title} key="ogsitename"/>
            <meta property="og:description" content={description} key="ogdesc"/>
            {children}
        </Helmet>
    );
};