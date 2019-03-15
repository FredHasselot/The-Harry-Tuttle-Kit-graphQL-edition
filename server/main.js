// ABSOLUTE IMPORTS
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { renderToString } from 'react-dom/server';
import { onPageLoad } from 'meteor/server-render';
import { StaticRouter } from 'react-router';
import { Helmet } from 'react-helmet';
// GRAPHQL STUFF
import { initialize } from 'meteor/cultofcoders:apollo';
import { load } from 'graphql-load';
import UserType from './gql/user.gql';
import UserResolver from './resolvers/user.resolver';
// RELATIVE IMPORTS
import { Router } from '../imports/ui/router';
// *****************************************************************************
Meteor.startup(() => {
  // GRAPHQL ->
  load({
    typeDefs: [UserType],
    resolvers: [UserResolver],
  });
  //
  initialize();
  // ---------------------------------------------------------------------------
  // SSR ->
  onPageLoad((sink) => {
    const App = props => {
      return (
        <StaticRouter location={props.location.path} context={{}}>
          <Router />
        </StaticRouter>
      );
    };

    sink.renderIntoElementById('app', renderToString(<App location={sink.request.url} />));

    const helmet = Helmet.renderStatic();
    sink.appendToHead(helmet.link.toString());
    sink.appendToHead(helmet.meta.toString());
    sink.appendToHead(helmet.title.toString());
  });
});
// *****************************************************************************
