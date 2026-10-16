
import React, { use, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Swal from 'sweetalert2';

const MyProducts = () => {
    const { user } = use(AuthContext);
    const showModalRef = useRef(null);

    const [myProducts, setMyProducts] = useState([]);
    const [editedProduct, setEditedProduct] = useState([]);
    const [showAllMyProducts, setShowMyAllProducts] = useState(false);

    const visibleMyProducts = showAllMyProducts
        ? myProducts
        : myProducts.slice(0, 7);

    useEffect(() => {
        if (user?.email) {
            fetch(`${import.meta.env.VITE_API_URL}/products?email=${user.email}`)
                .then(res => res.json())
                .then(data => {
                    console.log("my product data", data);
                    setMyProducts(data);
                });
        }
    }, [user?.email]);

    // Handle edit
    const handleEdit = (myProduct) => {
        setEditedProduct(myProduct);
        showModalRef.current.showModal();
    };

    // Handle update
    const handleUpdateProduct = (e) => {
        e.preventDefault();

        const editedData = {
            title: e.target.title.value,
            price_min: Number(e.target.priceMin.value),
            price_max: Number(e.target.priceMax.value),
            category: e.target.category.value,
            condition: e.target.condition.value,
            usage: e.target.usage.value,
            location: e.target.location.value,
            image: e.target.image.value,
            description: e.target.description.value,
            seller_contact: e.target.contact.value,
        };

        fetch(`${import.meta.env.VITE_API_URL}/products/${editedProduct._id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(editedData)
        })
            .then(res => res.json())
            .then(data => {
                console.log("edit my product", data);

                if (data.modifiedCount) {
                    const editedProducts = myProducts.map(product =>
                        product._id === editedProduct._id
                            ? { ...product, ...editedData }
                            : product
                    );

                    setMyProducts(editedProducts);
                    e.target.reset();
                    showModalRef.current.close();
                }
            });
    };

    // Handle delete
    const handleDelete = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#22c55e",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${import.meta.env.VITE_API_URL}/products/${_id}`, {
                    method: "DELETE",
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log("product deleted", data);

                        if (data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your product has been deleted.",
                                icon: "success",
                                confirmButtonColor: "#FFCA28",
                            });

                            const remainingProduct = myProducts.filter(
                                product => product._id !== _id
                            );

                            setMyProducts(remainingProduct);
                        }
                    });
            }
        });
    };

    const handleModalClose = (e) => {
        e.preventDefault();
        showModalRef.current.close();
    };

    const handleSeeAllMyProduct = () => {
        setShowMyAllProducts(!showAllMyProducts);
    };

    return (
        <div className='bg-gray-100 min-h-screen py-8 sm:py-10 lg:py-14'>
            <div className='w-11/12 sm:w-10/12 mx-auto'>

                {/* Page heading */}
                <h2 className='text-center text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8'>
                    My Products :{' '}
                    <span className='text-yellow-400 font-bold'>
                        {myProducts.length}
                    </span>
                </h2>

                {/* ========================================= */}
                {/* MOBILE PRODUCT CARDS */}
                {/* ========================================= */}

                <div className='lg:hidden flex flex-col gap-4'>
                    {visibleMyProducts.map((myProduct, index) => (
                        <div
                            key={myProduct._id}
                            className='bg-white rounded-xl shadow-sm overflow-hidden p-4'
                        >
                            {/* Image and product information */}
                            <div className='flex items-start gap-3 sm:gap-4'>

                                <img
                                    src={myProduct.image}
                                    alt={myProduct.title}
                                    className='w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-lg object-cover bg-gray-100'
                                />

                                <div className='flex-1 min-w-0'>
                                    <p className='text-xs text-gray-500 mb-1'>
                                        Product #{index + 1}
                                    </p>

                                    <h3 className='font-bold text-gray-800 text-base sm:text-lg break-words'>
                                        {myProduct.title}
                                    </h3>

                                    <p className='text-sm text-gray-500 mt-1 break-words'>
                                        {myProduct.category}
                                    </p>

                                    <span className='inline-block mt-2 badge badge-warning badge-sm'>
                                        {myProduct.status}
                                    </span>
                                </div>
                            </div>

                            {/* Price */}
                            <div className='mt-4 border-t border-gray-200 pt-3'>
                                <p className='text-sm text-gray-500'>
                                    Price Range
                                </p>

                                <p className='text-green-600 font-bold text-lg break-words'>
                                    ${myProduct.price_min} - ${myProduct.price_max}
                                </p>
                            </div>

                            {/* Actions */}
                            <div className='grid grid-cols-2 gap-3 mt-4'>
                                <button
                                    onClick={() => handleEdit(myProduct)}
                                    className='btn btn-outline border-green-500 text-green-600 hover:bg-green-500 hover:text-white btn-sm sm:btn-md w-full'
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => handleDelete(myProduct._id)}
                                    className='btn btn-outline border-red-500 text-red-500 hover:bg-red-500 hover:text-white btn-sm sm:btn-md w-full'
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}

                    {myProducts.length === 0 && (
                        <div className='bg-white rounded-xl p-8 text-center text-gray-500'>
                            You haven't added any products yet.
                        </div>
                    )}
                </div>

                {/* ========================================= */}
                {/* TABLET / DESKTOP PRODUCT TABLE */}
                {/* ========================================= */}

                <div className='hidden lg:block overflow-x-auto mt-4 rounded-lg'>
                    <table className='table table-fixed w-full bg-white'>

                        <colgroup>
                            <col style={{ width: "7%" }} />
                            <col style={{ width: "13%" }} />
                            <col style={{ width: "25%" }} />
                            <col style={{ width: "10%" }} />
                            <col style={{ width: "15%" }} />
                            <col style={{ width: "10%" }} />
                            <col style={{ width: "20%" }} />
                        </colgroup>

                        <thead>
                            <tr className='text-center'>
                                <th>SL No.</th>
                                <th>Image</th>
                                <th>Product Name</th>
                                <th>Category</th>
                                <th>Price Range</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {visibleMyProducts.map((myProduct, index) => (
                                <tr key={myProduct._id}>

                                    <td className='text-center text-gray-600 font-bold'>
                                        {index + 1}
                                    </td>

                                    <td>
                                        <div className='avatar shrink-0 flex justify-center'>
                                            <div className='h-12 w-12 rounded-md'>
                                                <img
                                                    src={myProduct.image}
                                                    alt={myProduct.title}
                                                    className='object-cover'
                                                />
                                            </div>
                                        </div>
                                    </td>

                                    <td>
                                        <div className='font-bold truncate text-center text-gray-700'>
                                            {myProduct.title}
                                        </div>
                                    </td>

                                    <td>
                                        <div className='font-bold truncate text-center text-gray-700'>
                                            {myProduct.category}
                                        </div>
                                    </td>

                                    <td className='text-center'>
                                        <span className='badge badge-ghost badge-sm text-green-500 font-semibold'>
                                            ${myProduct.price_min} - ${myProduct.price_max}
                                        </span>
                                    </td>

                                    <td className='text-center'>
                                        <span className='badge badge-warning'>
                                            {myProduct.status}
                                        </span>
                                    </td>

                                    <td>
                                        <div className='flex justify-center gap-2'>
                                            <button
                                                onClick={() => handleEdit(myProduct)}
                                                className='btn btn-sm btn-outline text-green-500 border-green-500'
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => handleDelete(myProduct._id)}
                                                className='btn btn-sm btn-outline text-red-500 border-red-500'
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* See all products */}
                {myProducts.length > 7 && (
                    <div className='flex justify-center mt-5'>
                        <button
                            onClick={handleSeeAllMyProduct}
                            className='btn btn-warning btn-sm sm:btn-md'
                        >
                            {showAllMyProducts
                                ? 'Less All My Products'
                                : 'See All My Products'}
                        </button>
                    </div>
                )}

                {/* ========================================= */}
                {/* EDIT PRODUCT MODAL */}
                {/* ========================================= */}

                <dialog
                    ref={showModalRef}
                    id='my_modal_5'
                    className='modal modal-bottom sm:modal-middle'
                >
                    <div className='modal-box w-11/12 max-w-3xl max-h-[90vh] overflow-y-auto'>

                        <h3 className='font-bold text-xl sm:text-2xl text-center'>
                            Update Your Product
                        </h3>

                        <form onSubmit={handleUpdateProduct} className='mt-5'>

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

                                {/* Title */}
                                <div>
                                    <label className='label'>Product Title</label>
                                    <input
                                        type='text'
                                        name='title'
                                        defaultValue={editedProduct.title || ''}
                                        className='input input-bordered w-full'
                                        placeholder='Enter product title'
                                        required
                                    />
                                </div>

                                {/* Category */}
                                <div>
                                    <label className='label'>Category</label>
                                    <select
                                        name='category'
                                        defaultValue={editedProduct.category || ''}
                                        className='select select-bordered w-full'
                                        required
                                    >
                                        <option value=''>Select Category</option>
                                        <option>Electronics</option>
                                        <option>Mobile</option>
                                        <option>Furniture</option>
                                        <option>Home Appliances</option>
                                        <option>Vehicles</option>
                                        <option>Fashion</option>
                                    </select>
                                </div>

                                {/* Minimum price */}
                                <div>
                                    <label className='label'>Minimum Price</label>
                                    <input
                                        type='number'
                                        name='priceMin'
                                        defaultValue={editedProduct.price_min ?? ''}
                                        className='input input-bordered w-full'
                                        placeholder='Minimum price'
                                        required
                                    />
                                </div>

                                {/* Maximum price */}
                                <div>
                                    <label className='label'>Maximum Price</label>
                                    <input
                                        type='number'
                                        name='priceMax'
                                        defaultValue={editedProduct.price_max ?? ''}
                                        className='input input-bordered w-full'
                                        placeholder='Maximum price'
                                        required
                                    />
                                </div>

                                {/* Condition */}
                                <div>
                                    <label className='label'>Condition</label>
                                    <select
                                        name='condition'
                                        defaultValue={editedProduct.condition || ''}
                                        className='select select-bordered w-full'
                                        required
                                    >
                                        <option value=''>Select Condition</option>
                                        <option>new</option>
                                        <option>used</option>
                                    </select>
                                </div>

                                {/* Usage */}
                                <div>
                                    <label className='label'>Usage</label>
                                    <input
                                        type='text'
                                        name='usage'
                                        defaultValue={editedProduct.usage || ''}
                                        className='input input-bordered w-full'
                                        placeholder='Example: 1 year old'
                                        required
                                    />
                                </div>

                                {/* Location */}
                                <div>
                                    <label className='label'>Location</label>
                                    <input
                                        type='text'
                                        name='location'
                                        defaultValue={editedProduct.location || ''}
                                        className='input input-bordered w-full'
                                        placeholder='Dhaka, Bangladesh'
                                        required
                                    />
                                </div>

                                {/* Contact */}
                                <div>
                                    <label className='label'>Seller Contact</label>
                                    <input
                                        type='text'
                                        name='contact'
                                        defaultValue={editedProduct.seller_contact || ''}
                                        className='input input-bordered w-full'
                                        placeholder='+8801XXXXXXXXX'
                                        required
                                    />
                                </div>

                            </div>

                            {/* Image */}
                            <div className='mt-4'>
                                <label className='label'>Image URL</label>
                                <input
                                    type='text'
                                    name='image'
                                    defaultValue={editedProduct.image || ''}
                                    className='input input-bordered w-full'
                                    placeholder='Paste image URL'
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div className='mt-4'>
                                <label className='label'>Description</label>
                                <textarea
                                    name='description'
                                    defaultValue={editedProduct.description || ''}
                                    className='textarea textarea-bordered w-full h-32'
                                    placeholder='Write product description...'
                                    required
                                ></textarea>
                            </div>

                            {/* Update */}
                            <button
                                type='submit'
                                className='btn bg-green-500 text-white font-bold w-full mt-6'
                            >
                                Update Product
                            </button>

                            {/* Close */}
                            <button
                                type='button'
                                onClick={handleModalClose}
                                className='btn btn-outline w-full border-red-600 text-red-600 font-bold mt-2'
                            >
                                Not Now
                            </button>

                        </form>
                    </div>
                </dialog>

            </div>
        </div>
    );
};

export default MyProducts;

