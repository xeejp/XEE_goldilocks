defmodule Goldilocks.Main do
  alias Goldilocks.Actions

  @pages ["waiting", "description", "experiment", "result"]
  @sequence ["question1", "question2", "question3", "answered"]

  def pages, do: @pages
  def sequence, do: @sequence

  def init do
    %{
      page: "waiting",
      participants: %{},
      joined: 0,
      answered: 0,
      oneone: 0,
      onetwo: 0,
      twoone: 0,
      twotwo: 0,
      question_text: %{
          'question': %{
              text: "つぎの3つの選択肢のうち、あなたの好む方を選んでください。",
           },
           'question1': %{
             text: "1. どちらかの選択肢を選んでください。",
              title: ["オプションA", "オプションB", "オプションC"],
              question: [
                "松の選択肢。", 
                "竹の選択肢。",
                "梅の選択肢。"
              ]
            },
           'question2': %{
             text: "2. どちらかの選択肢を選んでください。",
              title: ["オプションA", "オプションB", "オプションC"],
              question: [
                "松の選択肢。", 
                "竹の選択肢。",
                "梅の選択肢。"
              ]
            },
           'question3': %{
             text: "3. どちらかの選択肢を選んでください。",
              title: ["オプションA", "オプションB", "オプションC"],
              question: [
                "松の選択肢。", 
                "竹の選択肢。",
                "梅の選択肢。"
              ]
            },
            'answered': %{
              text: "あなたの回答は終了しました。他の参加者の回答が終了するまでこのままお待ちください。",
           },
           'waiting_text': "参加者の登録を待っています。\nこの画面のまましばらくお待ちください。",
           'description_text': "これから、3つの質問をします。\n選択肢のうち、あなたが最も好むものを選択してください。",
          },
        }
  end

  def new_participant(data) do
    %{
      question_text: data.question_text,
      sequence: "question1",
      question1: 0,
      question2: 0,
      question3: 0,
      active: true,
      joined: 1,
      qswap: false,
      oneone: data.oneone,
      onetwo: data.onetwo,
      twoone: data.twoone,
      twotwo: data.twotwo,
    }
  end

  def join(data, id) do
    unless Map.has_key?(data.participants, id) do
      new = new_participant(data)
      new = new |> Map.put(:joined, Map.size(data.participants) + 1)
      data = data |> Map.put(:participants, Enum.into(Enum.map(data.participants, fn {id, map} ->
        {id, Map.put(map, :joined, Map.size(data.participants) + 1)}
      end), %{}))
      put_in(data, [:participants, id], new)
      |> Actions.join(id, new)
    else
      data
    end
  end

  def wrap(data) do
    {:ok, %{"data" => data}}
  end
end