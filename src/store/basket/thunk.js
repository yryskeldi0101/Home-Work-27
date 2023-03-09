import { createAsyncThunk } from '@reduxjs/toolkit'
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios'
import {
    addToBasketRequest,
    deleteBasketItemRequest,
    updeteBasketItemRequest,
} from '../../lib/constans/mealServis'
import { getBasket } from './getBasket'

export const addtoBasket = createAsyncThunk(
    'basket/addToBasket',
    async (newItem, { dispatch, rejectWithValue, getState }) => {
        try {
            const { token } = getState().auth

            await addToBasketRequest(token, newItem)
            return dispatch(getBasket())
        } catch (error) {
            return rejectWithValue('Some thing wen wronf')
        }
    }
)

export const updeteBasketItem = createAsyncThunk(
    'basket/updeteBasket',
    async ({ amount, id }, { dispatch, rejectWithValue, getState }) => {
        try {
            const { token } = getState().auth

            await updeteBasketItemRequest(id, amount, token)
            dispatch(getBasket())
        } catch (error) {
            rejectWithValue(error)
        }
    }
)

export const deleteBasketItem = createAsyncThunk(
    '/basket/deleteBasket',
    async (id, { dispatch, rejectWithValue, getState }) => {
        try {
            const { token } = getState().auth

            await deleteBasketItemRequest(id, token)
            dispatch(getBasket())
        } catch (error) {
            rejectWithValue(error)
        }
    }
)

export const submitOrder = createAsyncThunk(
    'basket/submitOrder',
    async ({ orderData }, { dispatch, rejectWithValue }) => {
        try {
            await axios.post(
                `https://jsonplaceholder.typicode.com/posts`,
                orderData
            )

            return dispatch(getBasket())
        } catch (error) {
            return rejectWithValue('Some thing wen wronf')
        }
    }
)
