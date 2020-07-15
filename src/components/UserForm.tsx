import React from 'react'
import { Form, FormGroup, Label, CustomInput } from 'reactstrap'

const UserForm = () => {
    return (
        <>
            <Form className="my-2">
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
