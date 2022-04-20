import React from 'react';
import { Layout } from './src/components/Layout';

export function wrapPageElement({ element, props }) {
    return <Layout {...props}>{element}</Layout>
};

export const onRenderBody = ({ setPostBodyComponents }, pluginOptions) => {
    setPostBodyComponents([
        <div
            key={pluginOptions.key ? pluginOptions.key: 'portal'}
            id={pluginOptions.id ? pluginOptions.id : 'portal'}>
            {pluginOptions.text}
        </div>
    ]);
};