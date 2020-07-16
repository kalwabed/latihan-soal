import React from 'react'
import { Form, FormGroup, Label, CustomInput, Input } from 'reactstrap'
import { PropsUser, category } from '../types'

const UserForm: React.FC<PropsUser> = ({ category }) => {
    return (
        <>
            <Form className="my-2" onSubmit={e => e.preventDefault()}>
                <FormGroup>
                    <Label>Name</Label>
                    <Input
                        type="text"
                        className="username"
                        placeholder="contoh: Kalwabed Rizki"
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="category">Select Category</Label>
                    <CustomInput
                        type="select"
                        id="category"
                        className="category"
                    >
                        <option value="0">Random</option>
                        {category.map((cate: category) => (
                            <option key={cate.id} value={cate.id}>
                                {cate.name}
                            </option>
                        ))}
                    </CustomInput>
                </FormGroup>
                <FormGroup>
                    <Label>Pilih tingkat kesulitan:</Label>
                    <CustomInput
                        id="1"
                        defaultChecked
                        type="radio"
                        name="difficulty"
                        value="easy"
                        label="SMA sederajat"
                    />
                    <CustomInput
                        id="2"
                        type="radio"
                        name="difficulty"
                        value="medium"
                        label="Perguruan tinggi"
                    />
                    <CustomInput
                        id="3"
                        type="radio"
                        name="difficulty"
                        value="hard"
                        label="Pengetahuanku luas"
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Pilih paket:</Label>
                    <CustomInput
                        id="4"
                        defaultChecked
                        type="radio"
                        name="paket"
                        value="1"
                        label="Latihan (10 soal, 10 kesempatan)"
                    />
                    <CustomInput
                        id="5"
                        type="radio"
                        name="paket"
                        value="2"
                        label="Ulangan (20 soal, 20 kesempatan)"
                    />
                    <CustomInput
                        id="6"
                        type="radio"
                        name="paket"
                        value="3"
                        label="Ujian (40 soal, 40 kesempatan)"
                    />
                </FormGroup>
            </Form>
        </>
    )
}

export default UserForm
