import React from 'react'
import { Form, FormGroup, Label, CustomInput, Input } from 'reactstrap'

const UserForm = () => {
    return (
        <>
            <Form className="my-2" action="#">
                <FormGroup>
                    <Label>Name</Label>
                    <Input
                        type="text"
                        className="username"
                        placeholder="Nama kamu"
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Pilih tingkat kesulitan:</Label>
                    <CustomInput
                        id="1"
                        defaultChecked
                        type="radio"
                        name="difficulty"
                        value="easy"
                        label="SMA"
                    />
                    <CustomInput
                        id="2"
                        type="radio"
                        name="difficulty"
                        value="medium"
                        label="Anak Bimbel"
                    />
                    <CustomInput
                        id="3"
                        type="radio"
                        name="difficulty"
                        value="hard"
                        label="S1"
                    />
                </FormGroup>
            </Form>
        </>
    )
}

export default UserForm
