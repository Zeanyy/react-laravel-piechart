<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Channel;

class ChannelController extends Controller
{
    public function index() {
        return Channel::all();
    }

    public function store(Request $request) {
        $request->validate([
            'name' => 'required|string|max:255|unique:channels',
            'quantity' => 'required|numeric|min:1',
        ], [
            'name.required' => 'Nazwa jest wymagana.',
            'name.unique' => 'Nazwa już istnieje.',
            'name.string' => 'Nazwa musi być tekstem.',
            'quantity.required' => 'Ilość jest wymagana.',
            'quantity.min' => 'Ilość nie może być ujemna.',
            'quantity.numeric' => 'Ilość musi być liczbą.',
        ]);

        Channel::create($request->all());

        return response()->json(['message' => 'Item added successfully']);
    }

    public function update(Channel $channel, Request $request) {
        $request->validate([
            'quantity' => 'required|numeric|min:1',
        ], [
            'quantity.required' => 'Ilość jest wymagana',
            'quantity.min' => 'Ilość nie może być ujemna.',
            'quantity.numeric' => 'Ilość musi być liczbą',
        ]);

        $channel->update($request->all());
        return response()->json(['message' => 'Item updated successfully']);
    }

    public function destroy(Channel $channel) {
        $channel->delete();
        return response()->json(['message' => 'Item removed successfully']);
    }
}
