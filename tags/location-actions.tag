<location-actions>
  <btn each={ actions }>{ text }</btn>

  <style type=sass>
    location-actions
      display: block
  </style>

  <script type="babel">
    // location specific actions place holder
    this.actions = [
      {text: "Get stuff"},
      {text: "Get things"},
      {text: "do stuff"},
      {text: "do things"}
    ];
  </script>
</location-actions>
