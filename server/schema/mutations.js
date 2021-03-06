const mongoose = require("mongoose");
const graphql = require("graphql");
const { 
  GraphQLObjectType,
  GraphQLString, 
  GraphQLInt, 
  GraphQLID,
  GraphQLFloat
 } = graphql;

// import {
//   GraphQLDate
// } from 'graphql-iso-date';

const { GraphQLDate } = require("graphql-iso-date");

const UserType = require("./types/user_type");
const CampaignType = require("./types/campaign_type");
const ContributionType = require("./types/contribution_type");
// const SpeciesType = require("./types/species_type");
const UpdateType = require("./types/update_type");
const CommentType = require("./types/comment_type");
const PerkType = require("./types/perk_type");
const AuthService = require("../services/auth");

const Campaign = mongoose.model("campaigns");
const Comment = mongoose.model("comments");
const Contribution = mongoose.model("contributions");
const Perk = mongoose.model("perks");
const Update = mongoose.model("updates");
const User = mongoose.model("users");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    newCampaign: {
      type: CampaignType,
      args: {
        title: { type: GraphQLString },
        tagline: { type: GraphQLString },
        overview: { type: GraphQLString },
        story: { type: GraphQLString },
        faq: { type: GraphQLString },
        image_url: { type: GraphQLString },
        youtube_url: { type: GraphQLString },
        real_url: { type: GraphQLString },
        category: { type: GraphQLString },
        goal: { type: GraphQLFloat },
        end_date: { type: GraphQLDate },
        user: { type: GraphQLID }
      },
      resolve(_, { title, tagline, overview, story, faq, image_url, youtube_url, real_url, category, goal, end_date, user }) {
        return new Campaign({
          title, 
          tagline, 
          overview, 
          story, 
          faq, 
          image_url, 
          youtube_url,
          real_url,
          category,
          goal, 
          end_date,
          user
        }).save();
      }
    },
    deleteCampaign: {
      type: CampaignType,
      args: { _id: { type: GraphQLID } },
      resolve(_, { _id }) {
        return Campaign.remove({ _id });
      }
    },
    updateCampaign: {
      type: CampaignType,
      args: {
        _id: { type: GraphQLID },
        title: { type: GraphQLString },
        tagline: { type: GraphQLString },
        overview: { type: GraphQLString },
        story: { type: GraphQLString },
        faq: { type: GraphQLString },
        image_url: { type: GraphQLString },
        youtube_url: { type: GraphQLString },
        real_url: { type: GraphQLString },
        category: { type: GraphQLString },
        goal: { type: GraphQLFloat },
        end_date: { type: GraphQLDate },
        user: { type: GraphQLID }
      },
      resolve(parentValue, { _id, title, tagline, overview, story, faq, image_url, youtube_url, category, goal, end_date, user }) {
        const updateObj = {};
        // we can create our own object here and pass in the variables is they exist
        updateObj._id = _id;
        if (title) updateObj.title = title;
        if (tagline) updateObj.tagline = tagline;
        if (overview) updateObj.overview = overview;
        if (story) updateObj.story = story;
        if (faq) updateObj.faq = faq;
        if (image_url) updateObj.image_url = image_url;
        if (youtube_url) updateObj.youtube_url = youtube_url;
        if (real_url) updateObj.real_url = real_url;
        if (category) updateObj.category = category;
        if (goal) updateObj.goal = goal;
        if (end_date) updateObj.end_date = end_date;
        if (user) updateObj.user = user;

        return Campaign.findOneAndUpdate({ _id: _id }, { $set: updateObj }, { new: true }, (err, campaign) => {
          return campaign;
        });
      }
    },
    newUpdate: {
      type: UpdateType,
      args: {
        body: { type: GraphQLString },
        // user: { type: GraphQLID },
        campaign: { type: GraphQLID }
      },
      resolve(_, { body, campaign }) {
        return new Update({ body, campaign }).save();
      }
    },
    deleteUpdate: {
      type: UpdateType,
      args: { _id: { type: GraphQLID } },
      resolve(_, { _id }) {
        return Update.remove({ _id });
      }
    },
    updateUpdate: {
      type: UpdateType,
      args: {
        _id: { type: GraphQLID },
        body: { type: GraphQLString }
      },
      resolve(_, { _id, body }) {
        return Update.findOneAndUpdate({ _id: _id }, { $set: { body: body } }, { new: true }, (err, update) => {
          return update;
        });
      }
    },
    newComment: {
      type: CommentType,
      args: {
        body: { type: GraphQLString },
        user: { type: GraphQLID },
        campaign: { type: GraphQLID }
      },
      resolve(_, { body, user, campaign }) {
        return new Comment({ body, user, campaign }).save();
      }
    },
    deleteComment: {
      type: CommentType,
      args: { _id: { type: GraphQLID } },
      resolve(_, { _id }) {
        return Comment.remove({ _id });
      }
    },
    updateComment: {
      type: CommentType,
      args: {
        _id: { type: GraphQLID },
        body: { type: GraphQLString }
      },
      resolve(_, { _id, body }) {
        return Comment.findOneAndUpdate({ _id: _id }, { $set: { body: body } }, { new: true }, (err, comment) => {
          return comment;
        });
      }
    },
    newPerk: {
      type: PerkType,
      args: {
        campaign: { type: GraphQLID },
        cost: { type: GraphQLFloat },
        description: { type: GraphQLString },
        image_url: { type: GraphQLString },
        option: { type: GraphQLString }
      },
      resolve(_, { campaign, cost, description, image_url, option }) {
        return new Perk({ campaign_id, cost, description, image_url, option }).save();
      }
    },
    deletePerk: {
      type: PerkType,
      args: { _id: { type: GraphQLID } },
      resolve(_, { _id }) {
        return Perk.remove({ _id });
      }
    },
    updatePerk: {
      type: PerkType,
      args: {
        _id: { type: GraphQLID },
        cost: { type: GraphQLFloat },
        description: { type: GraphQLString },
        image_url: { type: GraphQLString },
        option: { type: GraphQLString },
      },
      resolve(_, { _id, cost, description, image_url, option }) {
        return Perk.findOneAndUpdate({ _id: _id }, { $set: { cost: cost, description: description, image_url: image_url, option: option  } }, { new: true }, (err, perk) => {
          return perk;
        });
      }
    },
    newContribution: {
      type: ContributionType,
      args: {
        campaign: { type: GraphQLID },
        user: { type: GraphQLID },
        amount: { type: GraphQLFloat },
      },
      resolve(_, { campaign, user, amount }) {
        return new Contribution({ campaign, user, amount }).save();
      }
    },
    
    // newCategory: {
    //   type: CategoryType,
    //   args: {
    //     name: { type: GraphQLString }
    //   },
    //   resolve(_, { name }) {
    //     return new Category({ name }).save();
    //   }
    // },
    // deleteCategory: {
    //   type: CategoryType,
    //   args: { _id: { type: GraphQLID } },
    //   resolve(_, { _id }) {
    //     return Category.remove({ _id });
    //   }
    // },
    // newProduct: {
    //   type: ProductType,
    //   args: {
    //     name: { type: GraphQLString },
    //     description: { type: GraphQLString },
    //     weight: { type: GraphQLInt }
    //   },
    //   async resolve(_, { name, description, weight }, ctx) {
    //     const validUser = await AuthService.verifyUser({ token: ctx.token });
    //     if (validUser.loggedIn) {
    //       return new Product({ name, description, weight }).save();
    //     } else {
    //       throw new Error(
    //         "Sorry, you need to be logged in to create a product."
    //       );
    //     }
    //   }
    // },
    // deleteProduct: {
    //   type: ProductType,
    //   args: { _id: { type: GraphQLID } },
    //   resolve(_, { _id }) {
    //     return Product.remove({ _id });
    //   }
    // },
    // updateProductCategory: {
    //   type: ProductType,
    //   args: {
    //     productId: { type: GraphQLID },
    //     categoryId: { type: GraphQLID }
    //   },
    //   resolve(_, { productId, categoryId }) {
    //     return Product.updateProductCategory(productId, categoryId);
    //   }
    // },
    register: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        bio_header: { type: GraphQLString },
        bio: { type: GraphQLString },
      },
      resolve(_, args) {
        return AuthService.register(args);
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.login(args);
      }
    },
    verifyUser: {
      type: UserType,
      args: {
        token: { type: GraphQLString }
      },
      async resolve(_, args) {
        return AuthService.verifyUser(args);
      }
    }
  }
});

module.exports = mutation;
