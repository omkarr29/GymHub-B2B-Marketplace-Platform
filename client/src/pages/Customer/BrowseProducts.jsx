import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';

const BrowseProducts = () => {
  const { addToCart } = useCart();
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || 'All';

  // Local filter states
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState(300000);
  const [sortBy, setSortBy] = useState('popular');
  const [addedToast, setAddedToast] = useState(null);

  // B2B Category List
  const categories = [
    'All',
    'Cardio Equipment',
    'Strength Equipment',
    'Free Weights',
    'Functional Training',
    'Gym Accessories',
    'Recovery Equipment',
    'Gym Flooring',
    'Commercial Gym Equipment',
  ];

  // Comprehensive Dummy Products Data for B2B Purchasing
  const dummyProducts = [
    {
      id: 'prod-1',
      name: 'Commercial Motorized Treadmill X9',
      category: 'Cardio Equipment',
      supplier: 'FitPro Industrial Ltd',
      price: 145000,
      rating: 4.8,
      stock: 'In Stock',
      minOrderQty: '1 Unit',
      image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=500&auto=format&fit=crop&q=60',
    },
    {
      id: 'prod-2',
      name: 'Olympic Heavy-Duty Flat Bench',
      category: 'Strength Equipment',
      supplier: 'IronGrip Manufacturing',
      price: 28500,
      rating: 4.9,
      stock: 'In Stock',
      minOrderQty: '2 Units',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&auto=format&fit=crop&q=60',
    },
    {
      id: 'prod-3',
      name: 'Dual Cable Crossover Station Pro',
      category: 'Commercial Gym Equipment',
      supplier: 'Apex Fitness Gear',
      price: 220000,
      rating: 4.7,
      stock: 'Limited Stock',
      minOrderQty: '1 Unit',
      image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=500&auto=format&fit=crop&q=60',
    },
    {
      id: 'prod-4',
      name: 'Commercial Rubber Flooring (1000 sq ft)',
      category: 'Gym Flooring',
      supplier: 'ToughTile Surfaces',
      price: 85000,
      rating: 4.9,
      stock: 'In Stock',
      minOrderQty: '500 sq ft',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&auto=format&fit=crop&q=60',
    },
    {
      id: 'prod-5',
      name: 'Commercial Power Rack with Cable Pulley',
      category: 'Strength Equipment',
      supplier: 'Titan Steel Fitness',
      price: 115000,
      rating: 4.8,
      stock: 'In Stock',
      minOrderQty: '1 Unit',
      image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=500&auto=format&fit=crop&q=60',
    },
    {
      id: 'prod-6',
      name: 'Olympic Urethane Weight Plates Set (250kg)',
      category: 'Free Weights',
      supplier: 'IronGrip Manufacturing',
      price: 62000,
      rating: 4.9,
      stock: 'In Stock',
      minOrderQty: '1 Set',
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&auto=format&fit=crop&q=60',
    },
    {
      id: 'prod-7',
      name: 'Adjustable Dumbbell Commercial Set (5-50kg)',
      category: 'Free Weights',
      supplier: 'Apex Fitness Gear',
      price: 64000,
      rating: 4.6,
      stock: 'In Stock',
      minOrderQty: '1 Set',
      image: 'https://images.unsplash.com/photo-1638803040283-7a5ffd48dad5?w=500&auto=format&fit=crop&q=60',
    },
    {
      id: 'prod-8',
      name: '45-Degree Commercial Leg Press Machine',
      category: 'Commercial Gym Equipment',
      supplier: 'FitPro Industrial Ltd',
      price: 165000,
      rating: 4.8,
      stock: 'Limited Stock',
      minOrderQty: '1 Unit',
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&auto=format&fit=crop&q=60',
    },
    {
      id: 'prod-9',
      name: 'Commercial Air Rower Ergometer',
      category: 'Cardio Equipment',
      supplier: 'FitPro Industrial Ltd',
      price: 78000,
      rating: 4.7,
      stock: 'In Stock',
      minOrderQty: '1 Unit',
      image: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=500&auto=format&fit=crop&q=60',
    },
    {
      id: 'prod-10',
      name: 'Battle Ropes & Functional Training Kit',
      category: 'Functional Training',
      supplier: 'ToughTile Surfaces',
      price: 32000,
      rating: 4.5,
      stock: 'In Stock',
      minOrderQty: '2 Kits',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500&auto=format&fit=crop&q=60',
    },
    {
      id: 'prod-11',
      name: 'Commercial Gym Storage & Accessory Rack Set',
      category: 'Gym Accessories',
      supplier: 'Apex Fitness Gear',
      price: 18500,
      rating: 4.6,
      stock: 'In Stock',
      minOrderQty: '1 Set',
      image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=500&auto=format&fit=crop&q=60',
    },
    {
      id: 'prod-12',
      name: 'Percussion Massage & Foam Roller Recovery Kit',
      category: 'Recovery Equipment',
      supplier: 'FitPro Industrial Ltd',
      price: 24500,
      rating: 4.7,
      stock: 'In Stock',
      minOrderQty: '1 Kit',
      image: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=500&auto=format&fit=crop&q=60',
    },
  ];

  // Filter & Search Logic
  const filteredProducts = useMemo(() => {
    return dummyProducts
      .filter((product) => {
        const matchesCategory =
          selectedCategory === 'All' || product.category === selectedCategory;
        const matchesSearch =
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesPrice = product.price <= priceRange;
        return matchesCategory && matchesSearch && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0;
      });
  }, [searchTerm, selectedCategory, priceRange, sortBy]);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    setAddedToast(`"${product.name}" added to cart.`);
    setTimeout(() => setAddedToast(null), 3000);
  };

  return (
    <div style={{ padding: '24px', backgroundColor: '#fff8f5', minHeight: '100%', boxSizing: 'border-box' }}>
      {/* Toast Notification */}
      {addedToast && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 100,
            padding: '12px 20px',
            borderRadius: '8px',
            backgroundColor: '#00687a',
            color: '#ffffff',
            fontSize: '13px',
            fontWeight: '600',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span>✓</span>
          <span>{addedToast}</span>
        </div>
      )}

      {/* Header & Search */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        <div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#211a16' }}>
            Equipment & Product Sourcing
          </h1>
          <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#79573d' }}>
            Direct manufacturer wholesale pricing for fitness facilities
          </p>
        </div>

        {/* Search Bar */}
        <div style={{ width: '100%', maxWidth: '320px' }}>
          <input
            type="text"
            placeholder="Search gym equipment or supplier..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px',
              fontSize: '13px',
              borderRadius: '8px',
              border: '1px solid #d8c3b5',
              backgroundColor: '#fff1e9',
              color: '#211a16',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>
      </div>

      {/* Main Layout: Filters & Products */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', alignItems: 'start' }}>
        {/* Left Filter Column */}
        <div
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #ede0d9',
            borderRadius: '12px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid #ede0d9',
              paddingBottom: '12px',
            }}
          >
            <span style={{ fontSize: '14px', fontWeight: '700', color: '#211a16' }}>
              Filters
            </span>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setPriceRange(300000);
                setSearchTerm('');
              }}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: '600',
                color: '#8c4f16',
              }}
            >
              Reset All
            </button>
          </div>

          {/* Category Filter */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '11px',
                fontWeight: '700',
                textTransform: 'uppercase',
                color: '#79573d',
                marginBottom: '8px',
              }}
            >
              Categories
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    textAlign: 'left',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: selectedCategory === cat ? '700' : '500',
                    backgroundColor: selectedCategory === cat ? '#fed1b0' : 'transparent',
                    color: selectedCategory === cat ? '#8c4f16' : '#534439',
                    border: 'none',
                    cursor: 'pointer',
                    transition: '0.2s ease',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label
                style={{
                  fontSize: '11px',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  color: '#79573d',
                }}
              >
                Max Price
              </label>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#8c4f16' }}>
                ₹{priceRange.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min="20000"
              max="300000"
              step="5000"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#8c4f16', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#857468', marginTop: '4px' }}>
              <span>₹20,000</span>
              <span>₹3,00,000+</span>
            </div>
          </div>
        </div>

        {/* Right Product Listing Area */}
        <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Active Summary & Sorting Bar */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              borderRadius: '8px',
              backgroundColor: '#fff1e9',
              border: '1px solid #ede0d9',
              fontSize: '12px',
              gap: '8px',
            }}
          >
            <span style={{ color: '#534439' }}>
              Showing <strong style={{ color: '#211a16' }}>{filteredProducts.length}</strong> wholesale equipment listings
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#79573d' }}>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: '4px 8px',
                  borderRadius: '6px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #d8c3b5',
                  fontSize: '12px',
                  color: '#211a16',
                  outline: 'none',
                }}
              >
                <option value="popular">Popular / Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div
              style={{
                padding: '48px 24px',
                textAlign: 'center',
                backgroundColor: '#ffffff',
                border: '1px solid #ede0d9',
                borderRadius: '12px',
              }}
            >
              <p style={{ margin: 0, fontSize: '15px', fontWeight: '600', color: '#211a16' }}>
                No equipment matches your filter criteria.
              </p>
              <p style={{ margin: '6px 0 0 0', fontSize: '12px', color: '#79573d' }}>
                Try adjusting your search terms or increasing your budget slider.
              </p>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: '20px',
              }}
            >
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #ede0d9',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  {/* Image & Badges */}
                  <div>
                    <div style={{ height: '180px', position: 'relative', overflow: 'hidden', backgroundColor: '#ede0d9' }}>
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <span
                        style={{
                          position: 'absolute',
                          top: '8px',
                          right: '8px',
                          fontSize: '11px',
                          fontWeight: '700',
                          padding: '2px 8px',
                          borderRadius: '9999px',
                          backgroundColor: '#fff1e9',
                          color: '#8c4f16',
                        }}
                      >
                        ★ {product.rating}
                      </span>
                      <span
                        style={{
                          position: 'absolute',
                          bottom: '8px',
                          left: '8px',
                          fontSize: '10px',
                          fontWeight: '700',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          backgroundColor: 'rgba(0,0,0,0.7)',
                          color: '#ffffff',
                        }}
                      >
                        MOQ: {product.minOrderQty}
                      </span>
                    </div>

                    {/* Information */}
                    <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: '700',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          color: '#00687a',
                        }}
                      >
                        {product.category}
                      </span>
                      <h3
                        style={{
                          margin: 0,
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#211a16',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {product.name}
                      </h3>
                      <p style={{ margin: 0, fontSize: '12px', color: '#79573d' }}>
                        Supplier: <span style={{ fontWeight: '500' }}>{product.supplier}</span>
                      </p>
                    </div>
                  </div>

                  {/* Pricing & Actions */}
                  <div style={{ padding: '14px', paddingTop: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderTop: '1px solid #ede0d9',
                        paddingTop: '8px',
                      }}
                    >
                      <div>
                        <span style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', color: '#857468', display: 'block' }}>
                          Wholesale Price
                        </span>
                        <span style={{ fontSize: '16px', fontWeight: '700', color: '#8c4f16' }}>
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: '600',
                          color: '#15803d',
                          backgroundColor: '#dcfce7',
                          padding: '2px 8px',
                          borderRadius: '4px',
                        }}
                      >
                        {product.stock}
                      </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      <Link
                        to={`/customer/product/${product.id}`}
                        style={{
                          textAlign: 'center',
                          padding: '8px',
                          fontSize: '12px',
                          fontWeight: '600',
                          borderRadius: '6px',
                          textDecoration: 'none',
                          backgroundColor: '#fff1e9',
                          color: '#8c4f16',
                          border: '1px solid #d8c3b5',
                        }}
                      >
                        View Specs
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleAddToCart(product)}
                        style={{
                          padding: '8px',
                          fontSize: '12px',
                          fontWeight: '600',
                          borderRadius: '6px',
                          border: 'none',
                          cursor: 'pointer',
                          backgroundColor: '#8c4f16',
                          color: '#ffffff',
                        }}
                      >
                        + Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowseProducts;