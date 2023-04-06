const blogForm = ({
    addBlog,
    newTitle,
    handleTitleChange,
    newAuthor,
    handeAuthorChange,
    newUrl,
    handeUrlChange
}) => (
    <form onSubmit={addBlog}>
      <div>
        <h2>Create New</h2>
        title:
        <input value={newTitle} onChange={handleTitleChange} />
      </div>
      <div>
        author:
        <input
          value={newAuthor}
          onChange={handeAuthorChange}
        />
      </div>
      <div>
        url:
        <input value={newUrl} onChange={handeUrlChange}/>
      </div>
      <button type="submit">Create</button>
    </form>
  );

export default blogForm;