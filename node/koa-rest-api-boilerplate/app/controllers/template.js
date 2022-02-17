const Template = require('../model/template');
const Response = require('../utils/response');

exports.templates = async (ctx) => {
  const temps = await Template.find({}).sort({ update_at: -1 });
  return Response.success(ctx, {
    code: 200,
    data: temps
  });
};
exports.template = async (ctx) => {
  try {
    const temp = await Template.findById({ _id: ctx.params.id });
    if(!temp) {
      return Response.success(ctx, {
        code: 400,
        data: {}
      });
    }else{
      return Response.success(ctx, {
        code: 200,
        data: temp
      });
    }
  } catch (error) {
    return Response.error(ctx, {
      code: 400,
    });
  }
};

exports.delTemplate = async (ctx) => {
  try {
    const temp = await Template.findByIdAndDelete({ _id: ctx.params.id });
    if(!temp) {
      return Response.success(ctx, {
        code: 400,
        data: {}
      });
    }else{
      return Response.success(ctx, {
        code: 200,
        data: temp
      });
    }
  } catch (error) {
    return Response.error(ctx, {
      code: 400,
    });
  }
};

exports.addTemplate = async (ctx) => {
  try {
    const temp = await Template.create(ctx.body);
    return Response.success(ctx, {
      code: 200,
      data: temp
    });
  } catch (error) {
    return Response.error(ctx, {
      code: 400,
    });
  }
};

exports.updateTemplate = async (ctx) => {
  try {
    const temp = await Template.findByIdAndUpdate(
      { _id: ctx.params.id },
      ctx.body,
      { new: true }
    );
    return Response.success(ctx, {
      code: 200,
      data: temp
    });
  } catch (error) {
    return Response.error(ctx, {
      code: 400,
    });
  }
};
