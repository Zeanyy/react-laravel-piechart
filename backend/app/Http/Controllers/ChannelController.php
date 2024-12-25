<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Channel;

class ChannelController extends Controller
{
    /**
     * Funkcja do pobierania danych z bazy danych
     * Zwraca pełną liste kanałów
     */
    public function index() {
        return Channel::all();
    }

    /**
     * Funkcja do tworzenia nowego rekordu w bazie danych
     * Waliduje przekazane dane w żądaniu:
     * - `name` musi być unikalne, tekstowe i jest wymagane
     * - `quantity` musi być liczbą, więsze niż 0 i jest wymagane
     * Po poprawnej walidacji, dodaje rekord do bazy i zwraca komunikat o sukcesie
     */
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

    /**
     * Funkcja do edycji wybranego rekordu w bazie danych
     * Waliduje przekazane dane w żądaniu:
     * - `quantity` musi być liczbą, więsze niż 0 i jest wymagane
     * Po udanej walidacji, edytuje rekord w bazie i zwraca komunikat o sukcesie
     */
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

    /**
     * Funkcja do usuwania wybranego rekordu w bazie danych
     * Usuwa wybrany rekord
     * Po usunięciu rekordu, zwraca komunikat o sukcesie
     */
    public function destroy(Channel $channel) {
        $channel->delete();
        return response()->json(['message' => 'Item removed successfully']);
    }
}
