import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class DropdownComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
      name: this.props.name,
      activeValue: this.props.activeValue,
      transactionCategoryArray: this.props.array || [],
    };
  }

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  handleClick = (e) => {
    this.setState({ activeValue: e.target.value });
    this.props.handleClickFromParent(e);
  }

  displayOptions = (array) => {
    return array.map((item,index) => {
      return <DropdownItem
        onClick={e => this.handleClick(e)}
        key={index}
        name={this.state.name}
        value={item.displayName}
        data-storedvalue={item.storedValue}
      >
        {item.displayName}
      </DropdownItem>
    })
  }

  render() {
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} size='sm' style={{width:'100%',textAlign:'left'}}>
        {this.props.children}
        <span style={{maxWidth:'60%'}}>
          <DropdownToggle caret color='primary'>
            {this.state.activeValue}
          </DropdownToggle>
          <DropdownMenu>
            {this.displayOptions(this.state.transactionCategoryArray)}
          </DropdownMenu>
        </span>
      </Dropdown>
    );
  }
}

export default DropdownComponent;