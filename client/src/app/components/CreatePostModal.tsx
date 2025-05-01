'use client'
const [showForm, setShowForm] = useState(false);
const [newPost, setNewPost] = useState({ title: '', content: '', username: '', email: '', category: '', image: null });

const handlePostSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('title', newPost.title);
  formData.append('content', newPost.content);
  formData.append('username', newPost.username);
  formData.append('email', newPost.email);
  formData.append('category', newPost.category);
  if (newPost.image) formData.append('image', newPost.image);

  try {
    const res = await axios.post('http://localhost:5000/api/posts', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    const createdPost = res.data;
    setPosts((prev) => [createdPost, ...prev]);
    setVotes((prev) => ({ ...prev, [createdPost.id]: createdPost.upvotes || 0 }));
    setShowForm(false);
    setNewPost({ title: '', content: '', username: '', email: '', category: '', image: null });
  } catch (err) {
    console.error('Error submitting post:', err);
    alert('Failed to submit post.');
  }
};

<button
  onClick={() => setShowForm(!showForm)}
  className="mb-4 bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded"
>
  {showForm ? 'Close Form' : 'Post Something'}
</button>

{showForm && (
  <form
    onSubmit={handlePostSubmit}
    className="bg-white shadow p-4 rounded mb-6 border space-y-3"
    encType="multipart/form-data"
  >
    <input
      type="text"
      placeholder="Title"
      value={newPost.title}
      onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
      required
      className="w-full border px-3 py-2 rounded"
    />
    <textarea
      placeholder="Content"
      value={newPost.content}
      onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
      required
      className="w-full border px-3 py-2 rounded"
    />
    <input
      type="text"
      placeholder="Your Name"
      value={newPost.username}
      onChange={(e) => setNewPost({ ...newPost, username: e.target.value })}
      required
      className="w-full border px-3 py-2 rounded"
    />
    <input
      type="email"
      placeholder="Your Email"
      value={newPost.email}
      onChange={(e) => setNewPost({ ...newPost, email: e.target.value })}
      required
      className="w-full border px-3 py-2 rounded"
    />
    <select
      value={newPost.category}
      onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
      className="w-full border px-3 py-2 rounded"
    >
      <option value="">Select Category</option>
      {categories.slice(1).map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
    <input
      type="file"
      accept="image/*"
      onChange={(e) => setNewPost({ ...newPost, image: e.target.files?.[0] || null })}
      className="w-full"
    />
    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">
      Submit Post
    </button>
  </form>
)}
