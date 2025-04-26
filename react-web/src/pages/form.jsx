import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { addProduct } from "../actions/userAction";

const ProductForm = () => {
    const [submitting, setSubmitting] = useState(false);

    // Define validation schema using Yup
    const validationSchema = Yup.object().shape({
        productName: Yup.string()
            .required("Product name is required")
            .min(3, "Product name must be at least 3 characters"),
        description: Yup.string()
            .required("Description is required")
            .min(10, "Description must be at least 10 characters"),
        variants: Yup.array()
            .of(
                Yup.object().shape({
                    name: Yup.string().required("Variant name is required"),
                    amount: Yup.number()
                        .required("Amount is required")
                        .positive("Amount must be positive")
                })
            )
            .min(1, "At least one variant is required")
    });

    // Initial form values
    const initialValues = {
        productName: "",
        description: "",
        variants: [
            { name: "", amount: "" }
        ]
    };

    // Form submission handler
    const handleSubmit = async (values, { resetForm, setSubmitting }) => {
        setSubmitting(true);
        try {

            let apiData = {
                productName: values.productName.trim(),
                productDescription: values.description.trim(),
                variants: values.variants.map(variant => ({
                    name: variant.name.trim(),
                    amount: variant.amount
                }))
            };

            await addProduct(apiData);
            resetForm();
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4 text-start text-gray-800">Add Product</h1>

            <div className="bg-white shadow rounded-lg p-6">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, errors, touched, isSubmitting, resetForm }) => (
                        <Form className="space-y-6">
                            {/* Product Name Field */}
                            <div>
                                <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">
                                    Product Name <span className="text-red-600">*</span>
                                </label>
                                <Field
                                    type="text"
                                    id="productName"
                                    name="productName"
                                    className={`w-full px-3 py-2 border ${
                                        errors.productName && touched.productName 
                                            ? 'border-red-500' 
                                            : 'border-gray-300'
                                    } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                                    placeholder="Enter product name"
                                />
                                <ErrorMessage name="productName" component="div" className="text-red-500 mt-1 text-sm" />
                            </div>
                            
                            {/* Description Field */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                    Product Description <span className="text-red-600">*</span>
                                </label>
                                <Field
                                    as="textarea"
                                    id="description"
                                    name="description"
                                    rows="4"
                                    className={`w-full px-3 py-2 border ${
                                        errors.description && touched.description 
                                            ? 'border-red-500' 
                                            : 'border-gray-300'
                                    } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                                    placeholder="Enter product description"
                                />
                                <ErrorMessage name="description" component="div" className="text-red-500 mt-1 text-sm" />
                            </div>
                            
                            {/* Variants Section */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Variants <span className="text-red-600">*</span>
                                    </label>
                                </div>
                                
                                <FieldArray name="variants">
                                    {({ remove, push }) => (
                                        <div className="space-y-4">
                                            {values.variants && values.variants.length > 0 ? (
                                                values.variants.map((variant, index) => (
                                                    <div key={index} className="flex flex-col md:flex-row gap-2 p-3 border border-gray-200 rounded bg-gray-50">
                                                        <div className="flex-1">
                                                            <label htmlFor={`variants.${index}.name`} className="block text-sm font-medium text-gray-700 mb-1">
                                                                Variant Name
                                                            </label>
                                                            <Field
                                                                name={`variants.${index}.name`}
                                                                placeholder="Enter variant name"
                                                                className={`w-full px-3 py-2 border ${
                                                                    errors.variants?.[index]?.name && touched.variants?.[index]?.name
                                                                        ? 'border-red-500'
                                                                        : 'border-gray-300'
                                                                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                                                            />
                                                            <ErrorMessage
                                                                name={`variants.${index}.name`}
                                                                component="div"
                                                                className="text-red-500 mt-1 text-sm"
                                                            />
                                                        </div>
                                                        
                                                        <div className="flex-1">
                                                            <label htmlFor={`variants.${index}.amount`} className="block text-sm font-medium text-gray-700 mb-1">
                                                                Amount
                                                            </label>
                                                            <Field
                                                                type="number"
                                                                name={`variants.${index}.amount`}
                                                                placeholder="Enter amount"
                                                                className={`w-full px-3 py-2 border ${
                                                                    errors.variants?.[index]?.amount && touched.variants?.[index]?.amount
                                                                        ? 'border-red-500'
                                                                        : 'border-gray-300'
                                                                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                                                            />
                                                            <ErrorMessage
                                                                name={`variants.${index}.amount`}
                                                                component="div"
                                                                className="text-red-500 mt-1 text-sm"
                                                            />
                                                        </div>
                                                        
                                                        {values.variants.length > 1 && (
                                                            <div className="flex items-end">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => remove(index)}
                                                                    className="px-2 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors cursor-pointer"
                                                                >
                                                                    Remove
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))
                                            ) : null}
                                            
                                            {errors.variants && typeof errors.variants === "string" && (
                                                <div className="text-red-500 text-sm">{errors.variants}</div>
                                            )}
                                            
                                            <div className="pt-2">
                                                <button
                                                    type="button"
                                                    onClick={() => push({ name: "", amount: "" })}
                                                    className="px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors flex items-center"
                                                >
                                                    <span className="mr-2">+</span> Add Variant
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </FieldArray>
                            </div>
                            
                            {/* Form Buttons */}
                            <div className="pt-4 flex justify-center gap-4">
                                <button
                                    type="button"
                                    onClick={() => resetForm()}
                                    className="cursor-pointer bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                    disabled={isSubmitting}
                                >
                                    Reset
                                </button>
                                
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="cursor-pointer bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <div className="flex justify-center items-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Submitting...
                                        </div>
                                    ) : (
                                        'Submit'
                                    )}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default ProductForm;