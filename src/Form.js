import React, { useState } from 'react';
import { Card, CardImg, Form, FormGroup, Input, Dropdown, DropdownToggle, DropdownMenu, Label, Button } from 'reactstrap';
import axios from 'axios';
import * as yup from 'yup';




const OrderForm = () => {

const [formData, setFormData] = useState({
	name: '',
	number: 0,
	protein: '',
	sauce: '',
	cilantro: false,
	onion: false,
	avocado: false,
  radish: false,
  special: ''
});

const [dropdownOpen, setDropdownOpen] = useState(false);

const schema =yup.object().shape({
  name: yup.string().required("Name must be filled out").min(2),
  number: yup.number().required("Must select at least one").positive().integer().min(1),
  sauce: yup.string().required("Must select at least one"),
  protein: yup.string().required("Must select at least one"),
  cilantro: yup.boolean(),
  onion: yup.boolean(),
  avocado: yup.boolean(),
  radish: yup.boolean(),
  special: yup.string()

})

			{/* Validating the schema against the form data, then have the axios post request */}


const submit = () => {
  schema.validate(formData).then( () => {
    axios.post('https://reqres.in/api/users', formData).then((res) => {
      console.log(res.data, 'This is your posted data')
    })
  })
}


const toggle = () => setDropdownOpen((prevState) => !prevState)
  
const handleChange = (e) => {
  setFormData({...formData, [e.target.name]: e.target.value})
};

const handleTopping = (e) => {
  setFormData({...formData, [e.target.name]: e.target.checked})
}


  return (
		<>
			<Card color="info">
				<h2 style={{ color: 'whitesmoke', margin: '0 auto' }}>
					Build Your Own Taco!
				</h2>
				<CardImg
					style={{ width: '80%', margin: '0 auto' }}
					src={require('./assets/taco-2.jpg')}
				/>
			</Card>

			{/* Creating onSubmit console.log to see if it is working */}

			<Form
        data-cy='submit'
				onSubmit={(e) => {
					e.preventDefault();
					submit();
				}}
				style={{ margin: '5%' }}
			>
				{/* Creating Name for form */}

				<FormGroup>
					<legend>Name</legend>
					<Input
						type="name"
						data-cy="name"
						name="name"
						value={formData.name}
						onChange={handleChange}
					/>
				</FormGroup>

				{/* Creating dropdown for how many tacos */}

				<FormGroup>
					<Dropdown isOpen={dropdownOpen} toggle={toggle}>
						{/* Creating ternary expression if else statement formData.number, IF it is true (if equal to 0 is that true or not) then we can have number of tacos display, ELSE put the formData.number  */}

						<DropdownToggle caret>
							{formData.number === 0 ? 'Number of Tacos' : formData.number}
						</DropdownToggle>
						<DropdownMenu>
							<div
								onClick={() => {
									toggle();
									setFormData({ ...formData, number: 0 });
								}}
							>
								0
							</div>
							<div
								onClick={() => {
									toggle();
									setFormData({ ...formData, number: 1 });
								}}
							>
								1
							</div>
							<div
								onClick={() => {
									toggle();
									setFormData({ ...formData, number: 2 });
								}}
							>
								2
							</div>
							<div
								onClick={() => {
									toggle();
									setFormData({ ...formData, number: 3 });
								}}
							>
								3
							</div>
							<div
								onClick={() => {
									toggle();
									setFormData({ ...formData, number: 4 });
								}}
							>
								4
							</div>
						</DropdownMenu>
					</Dropdown>
				</FormGroup>

				{/* Creating radio button to choose your protein */}

				<FormGroup tag="fieldset">
					<legend>Protein</legend>

					<FormGroup check>
						<Label check>
							<input
								type="radio"
								name="protein"
								value="beef"
								onChange={handleChange}
							/>
							Beef
						</Label>
					</FormGroup>

					<FormGroup check>
						<Label check>
							<input
								type="radio"
								name="protein"
								value="chicken"
								onChange={handleChange}
							/>
							Chicken
						</Label>
					</FormGroup>

					<FormGroup check>
						<Label check>
							<input
								type="radio"
								name="protein"
								value="pork"
								onChange={handleChange}
							/>
							Pork
						</Label>
					</FormGroup>

					<FormGroup check>
						<Label check>
							<input
								type="radio"
								name="protein"
								value="fish"
								onChange={handleChange}
							/>
							Fish
						</Label>
					</FormGroup>
				</FormGroup>

				{/* Creating radio button for Sauce */}

				<FormGroup tag="fieldset">
					<legend>Sauce</legend>

					<FormGroup check>
						<Label check>
							<input
								type="radio"
								name="sauce"
								value="red"
								onChange={handleChange}
							/>
							Red
						</Label>
					</FormGroup>

					<FormGroup check>
						<Label check>
							<input
								type="radio"
								name="sauce"
								value="green"
								onChange={handleChange}
							/>
							Green
						</Label>
					</FormGroup>

					<FormGroup check>
						<Label check>
							<input
								type="radio"
								name="sauce"
								value="chipotle"
								onChange={handleChange}
							/>
							Chipotle Mayo
						</Label>
					</FormGroup>

					<FormGroup check>
						<Label check>
							<input
								type="radio"
								name="sauce"
								value="none"
								onChange={handleChange}
							/>
							None
						</Label>
					</FormGroup>
				</FormGroup>

				{/* Creating checkbox for Toppings */}

				<FormGroup check>
					<legend>Toppings</legend>
					<Label check></Label>
					<Input
						type="checkbox"
						data-cy="checkbox1"
						name="cilantro"
						checked={formData.cilantro}
						onChange={handleTopping}
					/>
					Cilantro
				</FormGroup>

				<FormGroup check>
					<Label check></Label>
					<Input
						type="checkbox"
						data-cy="checkbox2"
						name="onion"
						checked={formData.onion}
						onChange={handleTopping}
					/>
					Onion
				</FormGroup>

				<FormGroup check>
					<Label check></Label>
					<Input
						type="checkbox"
						data-cy="checkbox3"
						name="avocado"
						checked={formData.avocado}
						onChange={handleTopping}
					/>
					Avocado
				</FormGroup>

				<FormGroup check>
					<Label check></Label>
					<Input
						type="checkbox"
						data-cy="checkbox4"
						name="radish"
						checked={formData.radish}
						onChange={handleTopping}
					/>
					Radish
				</FormGroup>

				{/* Creating textarea for special instructions */}

				<FormGroup>
					<legend>Special Instructions</legend>
					<Input
						type="textarea"
						name="special"
						value={formData.special}
						onChange={handleChange}
					/>
				</FormGroup>

				{/* Creating textarea for special instructions */}
				<Button>Submit</Button>
			</Form>
		</>
	);
}


export default OrderForm;