defmodule Goldilocks.Participant do
  alias Goldilocks.Actions

  # Actions
  def fetch_contents(data, id) do
    Actions.update_participant_contents(data, id)
  end

  def next_question(data, id, selected) do
    data = data |> put_in([:participants, id, :sequence], selected["next"])
    case selected["next"] do
      "question2" -> data = data |> put_in([:participants, id, :question1], selected["selected"])
      "question3" -> data = data |> put_in([:participants, id, :question2], selected["selected"])
      _ -> data = data |> put_in([:participants, id, :question3], selected["selected"])
                       |> Map.put(:answered, data.answered + 1)
    end
    Actions.next_question(data, id, selected)
  end

  # Utilities
  def format_participant(participant), do: participant

  def format_data(data) do
    %{
      page: data.page,
    }
  end

  def format_contents(data, id) do
    %{participants: participants} = data
    participant = Map.get(participants, id)
    format_participant(participant)
      |> Map.merge(format_data(data))
  end
end
