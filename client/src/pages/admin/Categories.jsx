import React, { useState } from 'react';

const Categories = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: '', slug: '', description: '', status: 'Active' });

  // Initial GymHub equipment categories dataset
  const initialCategories = [
    {
      id: 1,
      name: 'Cardio Equipment',
      slug: 'cardio-equipment',
      itemCount: 142,
      description: 'Commercial treadmills, ellipticals, spin bikes, and rowers.',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Strength Equipment',
      slug: 'strength-equipment',
      itemCount: 198,
      description: 'Pin-selected selectorized machines, plate-loaded stations, and cable crossovers.',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Functional Training',
      slug: 'functional-training',
      itemCount: 64,
      description: 'Kettlebells, plyo boxes, battle ropes, slam balls, and rig attachments.',
      status: 'Active'
    },
    {
      id: 4,
      name: 'Free Weights',
      slug: 'free-weights',
      itemCount: 85,
      description: 'Olympic barbells, urethane dumbbells, bumper plates, and weight trees.',
      status: 'Active'
    },
    {
      id: 5,
      name: 'Gym Accessories',
      slug: 'gym-accessories',
      itemCount: 38,
      description: 'Lifting belts, resistance bands, foam rollers, and cable attachments.',
      status: 'Active'
    },
    {
      id: 6,
      name: 'Gym Flooring',
      slug: 'gym-flooring',
      itemCount: 15,
      description: 'High-density rubber tiles, sprint turf tracks, and acoustic shock underlays.',
      status: 'Active'
    }
  ];

  const [categories, setCategories] = useState(initialCategories);

  // Filter Categories
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Open Modal for Add
  const handleOpenAddModal = () => {
    setEditingCategory(null);
    setFormData({ name: '', slug: '', description: '', status: 'Active' });
    setIsModalOpen(true);
  };

  // Open Modal for Edit
  const handleOpenEditModal = (cat) => {
    setEditingCategory(cat);
    setFormData({
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      status: cat.status
    });
    setIsModalOpen(true);
  };

  // Save Category (Add or Edit)
  const handleSaveCategory = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Please enter a category name.');
      return;
    }

    if (editingCategory) {
      // Update existing category
      setCategories(
        categories.map((cat) =>
          cat.id === editingCategory.id ? { ...cat, ...formData } : cat
        )
      );
    } else {
      // Add new category
      const newCategory = {
        id: Date.now(),
        name: formData.name,
        slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-'),
        itemCount: 0,
        description: formData.description || 'No description provided.',
        status: formData.status
      };
      setCategories([...categories, newCategory]);
    }

    setIsModalOpen(false);
  };

  // Delete Category
  const handleDeleteCategory = (id, name) => {
    if (window.confirm(`Are you sure you want to delete the "${name}" category?`)) {
      setCategories(categories.filter((cat) => cat.id !== id));
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '600', color: '#211a16' }}>
            Equipment Categories
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#534439' }}>
            Organize and classify B2B gym equipment and accessories.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          style={{
            padding: '10px 18px',
            backgroundColor: '#8c4f16',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            fontWeight: '600',
            fontSize: '13px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span>＋</span> Add Category
        </button>
      </div>

      {/* Search Bar */}
      <div
        style={{
          backgroundColor: '#fff8f5',
          border: '1px solid #d8c3b5',
          borderRadius: '8px',
          padding: '16px'
        }}
      >
        <div style={{ maxWidth: '340px' }}>
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: '6px',
              border: '1px solid #d8c3b5',
              backgroundColor: '#fff1e9',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>
      </div>

      {/* Categories Table */}
      <div
        style={{
          backgroundColor: '#fff8f5',
          border: '1px solid #d8c3b5',
          borderRadius: '8px',
          overflowX: 'auto'
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ backgroundColor: '#fff1e9', borderBottom: '1px solid #d8c3b5', color: '#534439' }}>
              <th style={{ padding: '12px 16px' }}>Category Name</th>
              <th style={{ padding: '12px 16px' }}>URL Slug</th>
              <th style={{ padding: '12px 16px' }}>Listed Items</th>
              <th style={{ padding: '12px 16px' }}>Status</th>
              <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.length > 0 ? (
              filteredCategories.map((cat) => (
                <tr key={cat.id} style={{ borderBottom: '1px solid #ede0d9' }}>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: '600', color: '#211a16' }}>{cat.name}</div>
                    <div style={{ fontSize: '12px', color: '#857468', marginTop: '2px' }}>{cat.description}</div>
                  </td>
                  <td style={{ padding: '14px 16px', color: '#79573d', fontFamily: 'monospace' }}>
                    /{cat.slug}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ fontWeight: '600', color: '#00687a' }}>{cat.itemCount} products</span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span
                      style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: '600',
                        backgroundColor: cat.status === 'Active' ? '#e6f4ea' : '#fce8e6',
                        color: cat.status === 'Active' ? '#137333' : '#ba1a1a'
                      }}
                    >
                      {cat.status}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '8px' }}>
                      <button
                        onClick={() => handleOpenEditModal(cat)}
                        style={{
                          padding: '4px 10px',
                          borderRadius: '4px',
                          border: '1px solid #d8c3b5',
                          backgroundColor: '#fff8f5',
                          color: '#00687a',
                          fontSize: '12px',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(cat.id, cat.name)}
                        style={{
                          padding: '4px 10px',
                          borderRadius: '4px',
                          border: '1px solid #ba1a1a',
                          backgroundColor: '#fce8e6',
                          color: '#ba1a1a',
                          fontSize: '12px',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ padding: '32px', textAlign: 'center', color: '#857468' }}>
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Category Modal */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(33, 26, 22, 0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '16px'
          }}
        >
          <div
            style={{
              backgroundColor: '#fff8f5',
              border: '1px solid #d8c3b5',
              borderRadius: '8px',
              width: '100%',
              maxWidth: '460px',
              padding: '24px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', color: '#211a16' }}>
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#534439' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveCategory} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#211a16', marginBottom: '4px' }}>
                  Category Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Commercial Gym Flooring"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid #d8c3b5',
                    backgroundColor: '#fff1e9',
                    fontSize: '13px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#211a16', marginBottom: '4px' }}>
                  URL Slug (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. gym-flooring"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid #d8c3b5',
                    backgroundColor: '#fff1e9',
                    fontSize: '13px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#211a16', marginBottom: '4px' }}>
                  Description
                </label>
                <textarea
                  rows="3"
                  placeholder="Short description of items in this category..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid #d8c3b5',
                    backgroundColor: '#fff1e9',
                    fontSize: '13px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#211a16', marginBottom: '4px' }}>
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid #d8c3b5',
                    backgroundColor: '#fff1e9',
                    fontSize: '13px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    cursor: 'pointer'
                  }}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    padding: '8px 14px',
                    backgroundColor: '#ede0d9',
                    color: '#211a16',
                    border: 'none',
                    borderRadius: '4px',
                    fontWeight: '600',
                    fontSize: '13px',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#8c4f16',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '4px',
                    fontWeight: '600',
                    fontSize: '13px',
                    cursor: 'pointer'
                  }}
                >
                  {editingCategory ? 'Save Changes' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;