import React from 'react';
import Login from '../../components/login/login';
import CreateNewUser from '../../components/createNewUser/createNewUser';
import Card from '../../components/card/card';
import Container from '../../components/container/container';
import SubmittedMsg from '../../components/submittedMsg/submittedMsg';

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showMessage: true,
      confirmationMessage: '',
    }
  }

  displaySubmittedMessage = () => {
    this.setState({
      showMessage: true,
      confirmationMessage: 'User submitted! Re-routing page...'
    });
    setTimeout(this.reroutePage, 3 * 1000);
  }

  reroutePage = () => {
    window.location = '/main';
  }

  render() {
    return (
      <Container>
        <SubmittedMsg>{this.state.showMessage && this.state.confirmationMessage}</SubmittedMsg>
        <Card width='40rem' margin='1rem auto'>
          <CreateNewUser displaySubmittedMessage={this.displaySubmittedMessage} />
        </Card>
        <Card width='40rem' margin='1rem auto'>
          <Login displaySubmittedMessage={this.displaySubmittedMessage} />
        </Card>
      </Container>
    )
  }
}
export default Home;
