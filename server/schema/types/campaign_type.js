const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean,
  GraphQLFloat
} = graphql;

// import {
//   GraphQLDate
// } from 'graphql-iso-date';

const GraphQLDate = require("graphql-iso-date");

const CampaignType = new GraphQLObjectType({
  name: 'CampaignType',
  fields: {
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    tagline: { type: GraphQLString },
    overview: { type: GraphQLString },
    story: { type: GraphQLBoolean },
    faq: { type: GraphQLString },
    image_url: { type: GraphQLString },
    category: { type: GraphQLString },
    raised: { type: GraphQLFloat },
    goal: { type: GraphQLFloat },
    end_date: { type: GraphQLDate },
  }
});

module.exports = CampaignType;
