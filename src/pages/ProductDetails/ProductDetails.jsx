
import React, { use, useEffect, useRef, useState } from 'react';
import { Link, useLoaderData } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import Swal from 'sweetalert2';
import { FaArrowLeft, FaArrowRight, FaUser } from 'react-icons/fa';

const ProductDetails = () => {
    const {
        _id: productId,
        product_id,
        title,
        price_min,
        price_max,
        image,
        posted_date,
        description,
        seller_image,
        seller_email,
        seller_name,
        location,
        condition,
        usage,
        seller_contact,
        sale_status
    } = useLoaderData();

    const showModalRef = useRef(null);
    const { user } = use(AuthContext);
    console.log(user);

    const [bids, setBids] = useState([]);
    const [showAllBids, setShowAllBids] = useState(false);
    const visibleBids = showAllBids ? bids : bids.slice(0, 5);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/products/bids/${productId}`)
            .then(res => res.json())
            .then(data => {
                console.log("bid for this product", data);
                setBids(data);
            });
    }, [productId]);

    const handleShowModal = () => {
        showModalRef.current.showModal();
    };

    const handleBidSubmit = e => {
        e.preventDefault();

        const name = e.target.name.value;
        const email = e.target.email.value;
        const bid = e.target.bid.value;

        console.log(productId, name, email, bid);

        const newBid = {
            product: productId,
            buyer_name: name,
            buyer_email: email,
            buyer_image: user?.photoURL,
            bid_price: bid,
            status: "pending"
        };

        fetch(`${import.meta.env.VITE_API_URL}/bids`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newBid)
        })
            .then(res => res.json())
            .then(data => {
                console.log("new bid added", data);

                if (data.insertedId) {
                    showModalRef.current.close();

                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "Your bid has been placed",
                        showConfirmButton: false,
                        timer: 1500
                    });

                    newBid._id = data.insertedId;

                    const newBids = [...bids, newBid].sort(
                        (a, b) => b.bid_price - a.bid_price
                    );

                    setBids(newBids);
                }
            });
    };

    const handleSeeMore = () => {
        console.log("see more");
        setShowAllBids(!showAllBids);
    };

    return (
        <div className='bg-gray-100'>

            {/* product information */}
            <div className='flex flex-col lg:flex-row justify-between gap-6 lg:gap-12 w-11/12 sm:w-10/12 mx-auto py-8 sm:py-10 lg:py-14'>

                {/* product description */}
                <div className='w-full lg:w-[45%] min-w-0'>

                    {/* image */}
                    <div className='h-56 sm:h-72 md:h-[350px]'>
                        <img
                            className='rounded-xl h-full w-full object-cover'
                            src={image}
                            alt="product image"
                        />
                    </div>

                    {/* text */}
                    <div className='bg-white p-4 sm:p-5 mt-5 rounded-xl'>

                        <h3 className='text-xl text-gray-700 font-bold'>
                            Product Description
                        </h3>

                        <div className='flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-4 py-2 border-b-1 border-gray-400'>
                            <p className='break-words'>
                                <span className='text-yellow-400 font-extrabold'>condition</span> :{' '}
                                <span className='font-bold text-gray-800'>{condition}</span>
                            </p>

                            <p className='break-words'>
                                <span className='text-yellow-400 font-semibold'>usage time</span> :{' '}
                                <span className='font-bold text-gray-800'>{usage}</span>
                            </p>
                        </div>

                        <p className='text-sm mt-3 text-gray-700 break-words'>
                            {description}
                        </p>
                    </div>
                </div>

                {/* product details */}
                <div className='w-full lg:w-[55%] min-w-0 space-y-4 lg:mt-4'>

                    <Link
                        to="/"
                        className='flex gap-2 items-center font-medium text-gray-700 hover:underline hover:text-yellow-500'
                    >
                        <FaArrowLeft />
                        <button>Back to Products</button>
                    </Link>

                    {/* title */}
                    <h2 className='text-2xl sm:text-3xl text-gray-800 font-bold break-words'>
                        {title}
                    </h2>

                    {/* price */}
                    <div className='bg-white p-4 rounded-xl'>
                        $<span className='text-green-500 font-semibold ml-2 break-words'>
                            {price_min} - {price_max}
                        </span>
                        <br />
                        <small className='text-sm text-gray-600'>
                            Price starts from
                        </small>
                    </div>

                    {/* details */}
                    <div className='bg-white p-4 rounded-xl'>
                        <h3 className='text-lg mb-2 font-semibold'>
                            Product Details
                        </h3>

                        <p className='text-gray-700 font-medium break-words'>
                            product Id :{' '}
                            <span className='text-gray-500 font-normal'>
                                #{product_id}
                            </span>
                        </p>

                        <p className='text-gray-700 font-medium break-words'>
                            Posted :{' '}
                            <span className='text-gray-500 font-normal'>
                                {posted_date}
                            </span>
                        </p>
                    </div>

                    {/* Seller Information */}
                    <div className='bg-white p-4 rounded-xl'>
                        <h3 className='text-lg mb-3 font-semibold'>
                            Seller Information
                        </h3>

                        <div className='flex items-center gap-2 mb-3 min-w-0'>
                            <img
                                className='w-12 h-12 shrink-0 rounded-full border-2 border-gray-700'
                                src={seller_image}
                                alt="seller image"
                            />

                            <div className='min-w-0'>
                                <p className='text-gray-800 font-semibold break-words'>
                                    {seller_name}
                                </p>

                                <p className='text-gray-500 break-all'>
                                    {seller_email}
                                </p>
                            </div>
                        </div>

                        <p className='text-gray-800 font-semibold mb-0.5 break-words'>
                            Location :{' '}
                            <span className='text-gray-500 font-normal'>
                                {location}
                            </span>
                        </p>

                        <p className='text-gray-800 font-semibold mb-0.5 break-words'>
                            Contact :{' '}
                            <span className='text-gray-500 font-normal'>
                                {seller_contact}
                            </span>
                        </p>

                        <p className='text-gray-800 font-semibold mb-0.5'>
                            Status :{' '}
                            <span className='bg-green-500 rounded-4xl p-1 text-sm text-black font-medium'>
                                {sale_status}
                            </span>
                        </p>
                    </div>

                    {/* button & modal */}
                    <div>
                        {/* button */}
                        <button
                            onClick={handleShowModal}
                            className='btn bg-yellow-500 w-full'
                        >
                            I want to buy this button
                        </button>

                        {/* modal */}
                        <dialog
                            ref={showModalRef}
                            className="modal modal-bottom sm:modal-middle"
                        >
                            <div className="modal-box w-11/12 max-w-lg max-h-[90vh] overflow-y-auto">
                                <h3 className="font-bold text-lg text-center">
                                    Give Seller Your Offered Price
                                </h3>

                                <form onSubmit={handleBidSubmit}>
                                    <fieldset className="fieldset">

                                        {/* name */}
                                        <label className="label">Your Name</label>
                                        <input
                                            className="w-full py-3 border-1 border-gray-400 rounded-sm p-2"
                                            name='name'
                                            type="text"
                                            readOnly
                                            defaultValue={user?.displayName}
                                        />

                                        {/* email */}
                                        <label className="label">Your Email</label>
                                        <input
                                            className="w-full py-3 border-1 border-gray-400 rounded-sm p-2"
                                            name='email'
                                            type="email"
                                            readOnly
                                            defaultValue={user?.email}
                                        />

                                        {/* bid */}
                                        <label className="label">Bid Ammount</label>
                                        <input
                                            className="w-full py-3 border-1 border-gray-400 rounded-sm p-2"
                                            name='bid'
                                            type="text"
                                            placeholder="type your bid ammount"
                                        />

                                        <button className='btn bg-yellow-400 mt-4'>
                                            Place your bid
                                        </button>
                                    </fieldset>
                                </form>

                                <div className="modal-action">
                                    <form method="dialog">
                                        <button className="btn">Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                    </div>
                </div>
            </div>

            {/* bid for this product */}
            <div className='w-11/12 sm:w-10/12 mx-auto pb-6'>

                <h2 className='text-2xl sm:text-3xl lg:text-4xl font-semibold break-words'>
                    Bids For This Products:{' '}
                    <span className='text-yellow-500'>{bids.length}</span>
                </h2>

                {/* table */}
                <div className="overflow-x-auto mt-4 rounded-lg">
                    <table className="table table-fixed w-full min-w-[600px] bg-white">

                        {/* column widths */}
                        <colgroup>
                            <col style={{ width: "8%" }} />
                            <col style={{ width: "30%" }} />
                            <col style={{ width: "32%" }} />
                            <col style={{ width: "15%" }} />
                            <col style={{ width: "15%" }} />
                        </colgroup>

                        {/* column head */}
                        <thead>
                            <tr>
                                <th>SL No.</th>
                                <th>Product</th>
                                <th>Buyers Name</th>
                                <th>Bid Price</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {visibleBids.map((bid, index) => (
                                <tr key={bid._id || index}>

                                    {/* sl no */}
                                    <td className='text-center'>
                                        {index + 1}
                                    </td>

                                    {/* product name */}
                                    <td>
                                        <div className="flex items-center gap-2 sm:gap-3">
                                            <div className="avatar shrink-0">
                                                <div className="mask mask-squircle h-10 w-10 sm:h-12 sm:w-12">
                                                    <img
                                                        src={image}
                                                        alt="product image"
                                                    />
                                                </div>
                                            </div>

                                            <div className="min-w-0">
                                                <div className="font-bold truncate">
                                                    {title}
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* buyer info */}
                                    <td>
                                        <div className="flex items-center gap-2 sm:gap-3">

                                            {/* buyer image */}
                                            <div className="avatar shrink-0">
                                                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border-2 border-yellow-400 flex items-center justify-center">

                                                    {bid.buyer_image
                                                        ? <img
                                                            src={bid.buyer_image}
                                                            alt="buyer image"
                                                            className="h-full w-full rounded-full object-cover"
                                                        />
                                                        : <FaUser className="text-xl text-gray-400" />
                                                    }

                                                </div>
                                            </div>

                                            <div className="min-w-0">
                                                {/* buyer name */}
                                                <div className="font-bold truncate">
                                                    {bid.buyer_name}
                                                </div>

                                                {/* buyer email */}
                                                <div className="text-xs opacity-50 truncate">
                                                    {bid.buyer_email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* bid price */}
                                    <td>
                                        <span className="badge badge-ghost badge-sm">
                                            {bid.bid_price}
                                        </span>
                                    </td>

                                    {/* status */}
                                    <td>
                                        {bid.status}
                                    </td>

                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>

                {/* see more and less */}
                {
                    bids.length > 5 &&
                    <div className="flex justify-center mt-6 pb-7">
                        {
                            showAllBids
                                ? <button
                                    onClick={handleSeeMore}
                                    className="btn btn-warning btn-sm sm:btn-md"
                                >
                                    See Less <FaArrowLeft />
                                </button>
                                : <button
                                    onClick={handleSeeMore}
                                    className="btn btn-warning btn-sm sm:btn-md"
                                >
                                    See More <FaArrowRight />
                                </button>
                        }
                    </div>
                }

            </div>
        </div>
    );
};

export default ProductDetails;

