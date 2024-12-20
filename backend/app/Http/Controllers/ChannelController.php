<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Channel;

class ChannelController extends Controller
{
    public function index() {
        return Channel::all();
    }

    public function create() {

    }

    public function update() {

    }

    public function destroy(Channel $channel) {
        $channel->delete();
        return response()->json(['message' => 'Item removed successfully']);
    }
}
