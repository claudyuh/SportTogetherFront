const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px dashed grey',
      color: state.isSelected ? 'blue' : 'black',
      padding: 15,
    })
}

export default customStyles;