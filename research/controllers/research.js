'use strict';

/**
 *  research controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::research.research', ({ strapi }) =>  ({
    async find(ctx) {
        const params = ctx.request.query
        const sortOpt = params.sortOpt ?? 'desc'
      
        const filterSchema = {sort: {createdAt: sortOpt}}
        if(params.title) filterSchema.title = params.title
        if(params.tags) filterSchema.tags = {contains: params.tags}
        if(params.startDate && params.endDate) filterSchema.$and = [{createdAt: {$gte: params.startDate}}, {createdAt: {$lte: params.endDate}}]
        if(params.sortBy) {
            filterSchema.sort = {[params.sortBy]: sortOpt}
        }

        console.log(filterSchema)

        const entries = await strapi.entityService.findMany('api::research.research', {
            filters: filterSchema
        });
        
        ctx.body = entries
      },
}));
