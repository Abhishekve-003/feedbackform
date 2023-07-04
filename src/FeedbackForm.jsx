import React from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup, Button } from '@mui/material';
import './FeedbackForm.css';

class FeedbackForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      choices: [],
      submitted: false,
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch('https://brijfeedback.pythonanywhere.com/api/get-feedback-questions/?unitID=1');
      const data = await response.json();

      this.setState({
        questions: data.feedbackQuestions,
        choices: Array(data.feedbackQuestions.length).fill(''),
      });
    } catch (error) {
      console.error('Error fetching feedback questions:', error);
    }
  }

  handleChange = (event, index) => {
    const { choices } = this.state;
    choices[index] = event.target.value;
    this.setState({ choices });
  };

  handleSubmit = () => {
    console.log('Feedback:', {
      questions: this.state.questions,
      choices: this.state.choices,
    });
    this.setState({ submitted: true});
  };

  render() {
    const { questions, choices,submitted } = this.state;

    if(submitted) {
      return <p>Thanks for your feedback!!</p>;
    }

    return (
      <form className="feedback-form">
        {questions.map((question, index) => (
          <FormControl component="fieldset" key={index} >
            <div  className='question'>
            <RadioGroup
              aria-label={`question-${index}`}
              name={`question-${index}`}
              value={choices[index]}
              onChange={event => this.handleChange(event, index)}
            >
              <p>{question}</p>
              <FormControlLabel value="Excellent" control={<Radio />} label="Excellent" />
              <FormControlLabel value="Good" control={<Radio />} label="Good" />
              <FormControlLabel value="Fair" control={<Radio />} label="Fair" />
              <FormControlLabel value="Poor" control={<Radio />} label="Poor" />
            </RadioGroup>
            </div>
            
          </FormControl>
        ))}
        <Button variant="contained" color="secondary" onClick={this.handleSubmit}>
          Submit
        </Button>
      </form>
    );
  }
}

export default FeedbackForm;



