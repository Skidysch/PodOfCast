class GetListOfInstancesByFieldMixin:
    @classmethod
    def get_or_create_objects_by_field(
        cls,
        field_name: str,
        data: str,
    ) -> list:
        instances = []
        if data:
            for field_value in data.strip().split(","):
                field_value = field_value.strip().lower()
                instance, _ = cls.objects.get_or_create(
                    **{field_name: field_value},
                )
                instances.append(instance)
        return instances
