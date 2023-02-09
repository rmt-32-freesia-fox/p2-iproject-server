# Elearning Management System API Documentation

## Models :

_Student_

```
- username : string, required
- email : string, required, unique
- password : string, required
- profileImg :sting, required
- role:string,required
```

_Teacher_ (hasManyCourses)

```
- username : string, required
- email : string, required, unique
- password : string, required
- profileImg :sting, required
- role:string,required
```

_Course_ (HasMany material) (belongsTo Teacher)

```
- name : string, required
- thumbnail:string,required
- description: string, required
- TeacherId: integer, required
```

_Material_ (belongsTo courses)

```
- name : string, required
- videoId: string, required
- docsId :string, required
- CourseId :integer, required
```

_Class_ (belongsTo student) (belongTo Course)

```
- StudentId: integer, required
- CourseId: integer, required
- status: string, required
_Category_ (hasMany Course)
```

- name: string, required

```




## Relation :

>### **One-to-Many**
>- Teacher dan Course = **One-to-Many**
>- Course dan material = **One-to-Many**
>### **Many-to-Many**
>- Student dan Course = **Many-to-Many**
```
