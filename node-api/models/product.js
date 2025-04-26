import mongoose from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
import mongoosePaginate from 'mongoose-paginate-v2';

const variantSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true
        }
    },
    {
        _id: false

    }
);

const productSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: true,
        },
        productDescription: {
            type: String,
        },
        variants: {
            type: [variantSchema],
            required: true,
            validate: {
                validator: function (v) {
                    return v.length > 0;
                },
                message: 'At least one variant is required'
            }
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true
    }
);

// Adding plugins for pagination
productSchema.plugin(mongooseAggregatePaginate);
productSchema.plugin(mongoosePaginate);

// Indexs on productName & userId
productSchema.index({ productName: 1, userId: 1 });

const Product = mongoose.model('Product', productSchema);

export default Product;