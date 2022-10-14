export let RenderErrors = ({ errors }) => {
    let renderErrors = () => errors?.map((error, idx) => <RenderError key={idx} error={error} />)
    return (
      <ul className='errors-list'>
        {renderErrors()}
      </ul>
    )
  }
  
  let RenderError = ({ error }) => {
    return (
      <li className='list-item'>`{error.param} -- {error.msg}`</li>
    )
  }