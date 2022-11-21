<script>
export default {
  name: "slotTableColumn",
  props: ["label", "prop"],
  render() {
    return <td>{this.label}</td>;
  },
};
</script>
